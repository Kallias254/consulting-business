package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/types"
)

func main() {
	app := pocketbase.New()

	// 1. Configure hooks for schema configuration & database seeding
	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		if err := ensureCollections(app); err != nil {
			log.Printf("Error configuring collections: %v", err)
		}

		if err := seedDatabase(app); err != nil {
			log.Printf("Error seeding database: %v", err)
		}

		registerAIEndpoints(e, app)

		// Serve static frontend files if present in pb_public
		e.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		return e.Next()
	})

	// Register database hooks
	registerHooks(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

// -----------------------------------------------------------------------------
// Collection / Schema Configurations (PocketBase v0.39.6 Clean Setup)
// -----------------------------------------------------------------------------

func ensureCollections(app *pocketbase.PocketBase) error {
	// Configure "users" auth collection
	usersColl, err := app.FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	needsUserSave := false

	usersColl.ListRule = types.Pointer("id = @request.auth.id || @request.auth.roles:each = 'admin' || @request.auth.roles:each = 'lead_researcher'")
	usersColl.ViewRule = types.Pointer("id = @request.auth.id || @request.auth.roles:each = 'admin' || @request.auth.roles:each = 'lead_researcher'")
	needsUserSave = true

	if usersColl.Fields.GetByName("roles") == nil {
		usersColl.Fields.Add(&core.SelectField{
			Name:      "roles",
			Required:  true,
			MaxSelect: 2,
			Values:    []string{"admin", "lead_researcher", "researcher", "client"},
		})
		needsUserSave = true
	}
	if usersColl.Fields.GetByName("academicNiche") == nil {
		usersColl.Fields.Add(&core.SelectField{
			Name:      "academicNiche",
			MaxSelect: 1,
			Values:    []string{"social_sciences", "stem", "humanities", "law", "medicine", "business", "education", "other"},
		})
		needsUserSave = true
	}
	if usersColl.Fields.GetByName("keywords") == nil {
		usersColl.Fields.Add(&core.JSONField{Name: "keywords"}) // array of strings e.g. ["ethnography", "qualitative"]
		needsUserSave = true
	}
	if usersColl.Fields.GetByName("institution") == nil {
		usersColl.Fields.Add(&core.TextField{Name: "institution"}) // e.g. "University of Michigan"
		needsUserSave = true
	}
	if usersColl.Fields.GetByName("sentimentScore") == nil {
		usersColl.Fields.Add(&core.NumberField{Name: "sentimentScore"}) // 0-100, auto-updated by hooks
		needsUserSave = true
	}
	if needsUserSave {
		if err := app.Save(usersColl); err != nil {
			return err
		}
	}

	// 1. Publishers Collection
	if _, err := app.FindCollectionByNameOrId("publishers"); err != nil {
		publishers := core.NewBaseCollection("publishers")
		publishers.ListRule = types.Pointer("@request.auth.id != ''")
		publishers.ViewRule = types.Pointer("@request.auth.id != ''")
		publishers.CreateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		publishers.UpdateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		publishers.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		publishers.Fields.Add(&core.TextField{Name: "name", Required: true})
		publishers.Fields.Add(&core.URLField{Name: "website"})
		publishers.Fields.Add(&core.URLField{Name: "submissionPortal"})
		publishers.Fields.Add(&core.TextField{Name: "primaryContact"})
		publishers.Fields.Add(&core.TextField{Name: "globalGuidelines"})
		publishers.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		publishers.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(publishers); err != nil {
			return err
		}
	}

	// 2. Project Templates Collection
	if _, err := app.FindCollectionByNameOrId("project_templates"); err != nil {
		publishers, _ := app.FindCollectionByNameOrId("publishers")
		templates := core.NewBaseCollection("project_templates")
		templates.ListRule = types.Pointer("@request.auth.id != ''")
		templates.ViewRule = types.Pointer("@request.auth.id != ''")
		templates.CreateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		templates.UpdateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		templates.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		templates.Fields.Add(&core.TextField{Name: "name", Required: true})
		templates.Fields.Add(&core.RelationField{
			Name:         "publisher",
			Required:     true,
			CollectionId: publishers.Id,
			MaxSelect:    1,
		})
		templates.Fields.Add(&core.SelectField{
			Name:      "productType",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"journal_article", "handbook", "textbook", "grant_proposal", "dissertation"},
		})
		templates.Fields.Add(&core.JSONField{Name: "units"})
		templates.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		templates.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(templates); err != nil {
			return err
		}
	}

	// 3. Projects Collection
	if _, err := app.FindCollectionByNameOrId("projects"); err != nil {
		projects := core.NewBaseCollection("projects")
		projects.ListRule = types.Pointer("@request.auth.id = client.id || @request.auth.id = leadResearcher.id || @request.auth.roles:each = 'admin'")
		projects.ViewRule = types.Pointer("@request.auth.id = client.id || @request.auth.id = leadResearcher.id || @request.auth.roles:each = 'admin'")
		projects.CreateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		projects.UpdateRule = types.Pointer("@request.auth.id = leadResearcher.id || @request.auth.roles:each = 'admin'")
		projects.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		projects.Fields.Add(&core.TextField{Name: "title", Required: true})
		projects.Fields.Add(&core.TextField{Name: "slug", Required: true})
		projects.Fields.Add(&core.RelationField{
			Name:         "client",
			Required:     true,
			CollectionId: usersColl.Id,
			MaxSelect:    1,
		})
		projects.Fields.Add(&core.RelationField{
			Name:         "leadResearcher",
			Required:     true,
			CollectionId: usersColl.Id,
			MaxSelect:    1,
		})
		projects.Fields.Add(&core.SelectField{
			Name:      "status",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"onboarding", "active", "waiting", "finalizing", "completed"},
		})
		projects.Fields.Add(&core.TextField{Name: "nextMilestone"})
		projects.Fields.Add(&core.NumberField{Name: "progress"})
		projects.Fields.Add(&core.JSONField{Name: "units"})
		publishersColl, err := app.FindCollectionByNameOrId("publishers")
		if err != nil {
			return err
		}
		projects.Fields.Add(&core.RelationField{
			Name:         "publisher",
			CollectionId: publishersColl.Id,
			MaxSelect:    1,
		})
		projects.Fields.Add(&core.BoolField{Name: "showOnPortfolio"}) // expose on public impact portfolio
		projects.Fields.Add(&core.NumberField{Name: "sentimentScore"}) // 0-100, auto-updated
		projects.Fields.Add(&core.DateField{Name: "lastContactAt"})    // set when correspondence sent
		projects.Fields.Add(&core.TextField{Name: "statusRecap"})
		projects.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		projects.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(projects); err != nil {
			return err
		}
	}

	// Ensure statusRecap exists on projects collection dynamically if it already exists
	projectsColl, err := app.FindCollectionByNameOrId("projects")
	if err != nil {
		return err
	}
	if projectsColl.Fields.GetByName("statusRecap") == nil {
		projectsColl.Fields.Add(&core.TextField{Name: "statusRecap"})
		if err := app.Save(projectsColl); err != nil {
			return err
		}
	}

	// 4. Tasks Collection
	if _, err := app.FindCollectionByNameOrId("tasks"); err != nil {
		projects, _ := app.FindCollectionByNameOrId("projects")
		tasks := core.NewBaseCollection("tasks")
		tasks.ListRule = types.Pointer("@request.auth.id = assignedTo.id || @request.auth.id = project.leadResearcher.id || @request.auth.roles:each = 'admin'")
		tasks.ViewRule = types.Pointer("@request.auth.id = assignedTo.id || @request.auth.id = project.leadResearcher.id || @request.auth.roles:each = 'admin'")
		tasks.CreateRule = types.Pointer("@request.auth.id = project.leadResearcher.id || @request.auth.roles:each = 'admin'")
		tasks.UpdateRule = types.Pointer("@request.auth.id = assignedTo.id || @request.auth.id = project.leadResearcher.id || @request.auth.roles:each = 'admin'")
		tasks.DeleteRule = types.Pointer("@request.auth.id = project.leadResearcher.id || @request.auth.roles:each = 'admin'")

		tasks.Fields.Add(&core.TextField{Name: "title", Required: true})
		tasks.Fields.Add(&core.RelationField{
			Name:         "project",
			Required:     true,
			CollectionId: projects.Id,
			MaxSelect:    1,
		})
		tasks.Fields.Add(&core.RelationField{
			Name:         "assignedTo",
			Required:     true,
			CollectionId: usersColl.Id,
			MaxSelect:    1,
		})
		tasks.Fields.Add(&core.SelectField{
			Name:      "status",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"todo", "in_progress", "review", "done"},
		})
		tasks.Fields.Add(&core.SelectField{
			Name:      "priority",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"low", "medium", "high", "urgent"},
		})
		tasks.Fields.Add(&core.DateField{Name: "due"})
		tasks.Fields.Add(&core.TextField{Name: "description"})
		tasks.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		tasks.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(tasks); err != nil {
			return err
		}
	}

	// 5. Correspondence Collection
	if _, err := app.FindCollectionByNameOrId("correspondence"); err != nil {
		projects, _ := app.FindCollectionByNameOrId("projects")
		corr := core.NewBaseCollection("correspondence")
		corr.ListRule = types.Pointer("@request.auth.id = project.client.id || @request.auth.id = author.id || @request.auth.roles:each = 'admin'")
		corr.ViewRule = types.Pointer("@request.auth.id = project.client.id || @request.auth.id = author.id || @request.auth.roles:each = 'admin'")
		corr.CreateRule = types.Pointer("@request.auth.id != ''")
		corr.UpdateRule = types.Pointer("@request.auth.roles:each = 'admin' || (@request.auth.id = author.id && status = 'draft')")
		corr.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		corr.Fields.Add(&core.RelationField{
			Name:         "project",
			Required:     true,
			CollectionId: projects.Id,
			MaxSelect:    1,
		})
		corr.Fields.Add(&core.RelationField{
			Name:         "author",
			Required:     true,
			CollectionId: usersColl.Id,
			MaxSelect:    1,
		})
		corr.Fields.Add(&core.SelectField{
			Name:      "target",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"client", "publisher", "other"},
		})
		corr.Fields.Add(&core.TextField{Name: "recipientEmail", Required: true})
		corr.Fields.Add(&core.TextField{Name: "subject", Required: true})
		corr.Fields.Add(&core.TextField{Name: "content", Required: true})
		corr.Fields.Add(&core.SelectField{
			Name:      "status",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"draft", "pending_approval", "approved", "sent"},
		})
		corr.Fields.Add(&core.RelationField{
			Name:         "approver",
			CollectionId: usersColl.Id,
			MaxSelect:    1,
		})
		corr.Fields.Add(&core.DateField{Name: "sentAt"})
		corr.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		corr.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(corr); err != nil {
			return err
		}
	}

	// 6. Audit Logs Collection
	if _, err := app.FindCollectionByNameOrId("audit_logs"); err != nil {
		projects, _ := app.FindCollectionByNameOrId("projects")
		audit := core.NewBaseCollection("audit_logs")
		audit.ListRule = types.Pointer("@request.auth.roles:each = 'admin'")
		audit.ViewRule = types.Pointer("@request.auth.roles:each = 'admin'")
		audit.CreateRule = nil // server-side hooks only; rules don't apply to app.Save()
		audit.UpdateRule = nil // no updates allowed
		audit.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		audit.Fields.Add(&core.RelationField{
			Name:         "project",
			CollectionId: projects.Id,
			MaxSelect:    1,
		})
		audit.Fields.Add(&core.SelectField{
			Name:      "stream",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"technical", "lifecycle"},
		})
		audit.Fields.Add(&core.SelectField{
			Name:      "eventType",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"wasm_render", "email_in", "git_sync", "sentiment_alert"},
		})
		audit.Fields.Add(&core.JSONField{Name: "payload"})
		audit.Fields.Add(&core.SelectField{
			Name:      "importance",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"low", "medium", "high"},
		})
		audit.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		audit.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(audit); err != nil {
			return err
		}
	}

	// 7. Media / Project Vault Collection
	if _, err := app.FindCollectionByNameOrId("media"); err != nil {
		media := core.NewBaseCollection("media")
		media.ListRule = types.Pointer("@request.auth.id != ''")
		media.ViewRule = types.Pointer("@request.auth.id != ''")
		media.CreateRule = types.Pointer("@request.auth.id != ''")
		media.UpdateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		media.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		projectsColl, _ := app.FindCollectionByNameOrId("projects")
		usersColl2, _ := app.FindCollectionByNameOrId("users")

		media.Fields.Add(&core.FileField{
			Name:      "file",
			Required:  true,
			MaxSelect: 1,
			MaxSize:   50 * 1024 * 1024, // 50MB
			MimeTypes: []string{
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"text/plain",
				"application/x-bibtex",
				"image/jpeg",
				"image/png",
			},
		})
		media.Fields.Add(&core.TextField{Name: "label"})       // Human readable name e.g. "Chapter 2 Final Draft"
		media.Fields.Add(&core.NumberField{Name: "version"})   // Version number e.g. 3
		media.Fields.Add(&core.SelectField{
			Name:      "fileType",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"guideline", "artwork", "bibliography", "manuscript_draft", "output_pdf", "other"},
		})
		media.Fields.Add(&core.SelectField{
			Name:      "source",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"upload", "email_ingestion", "system_render"},
		})
		media.Fields.Add(&core.SelectField{
			Name:      "visibility",
			MaxSelect: 1,
			Values:    []string{"internal", "client_visible", "public"},
		})
		if projectsColl != nil {
			media.Fields.Add(&core.RelationField{
				Name:         "project",
				CollectionId: projectsColl.Id,
				MaxSelect:    1,
			})
		}
		if usersColl2 != nil {
			media.Fields.Add(&core.RelationField{
				Name:         "uploadedBy",
				CollectionId: usersColl2.Id,
				MaxSelect:    1,
			})
		}
		media.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		media.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(media); err != nil {
			return err
		}
	}

	// 8. Leads / Intake Pipeline Collection
	if _, err := app.FindCollectionByNameOrId("leads"); err != nil {
		leads := core.NewBaseCollection("leads")
		leads.ListRule = types.Pointer("@request.auth.roles:each = 'admin'")
		leads.ViewRule = types.Pointer("@request.auth.roles:each = 'admin'")
		leads.CreateRule = types.Pointer("") // open — public intake form can POST here
		leads.UpdateRule = types.Pointer("@request.auth.roles:each = 'admin'")
		leads.DeleteRule = types.Pointer("@request.auth.roles:each = 'admin'")

		leads.Fields.Add(&core.TextField{Name: "name", Required: true})
		leads.Fields.Add(&core.EmailField{Name: "email", Required: true})
		leads.Fields.Add(&core.TextField{Name: "university"})
		leads.Fields.Add(&core.SelectField{
			Name:      "documentType",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"dissertation", "journal_article", "book_manuscript", "grant_proposal", "other"},
		})
		leads.Fields.Add(&core.SelectField{
			Name:      "projectStatus",
			MaxSelect: 1,
			Values:    []string{"drafting", "completed", "under_revision_by_press", "submitted"},
		})
		leads.Fields.Add(&core.TextField{Name: "targetPublisher"}) // e.g. "CRC Press"
		leads.Fields.Add(&core.TextField{Name: "primaryPainPoint"}) // free text
		leads.Fields.Add(&core.TextField{Name: "howHeard"})         // referral source
		leads.Fields.Add(&core.SelectField{
			Name:      "status",
			Required:  true,
			MaxSelect: 1,
			Values:    []string{"new", "auditing", "discovery", "archived", "promoted"},
		})
		leads.Fields.Add(&core.SelectField{
			Name:      "priority",
			MaxSelect: 1,
			Values:    []string{"low", "medium", "high"},
		})
		leads.Fields.Add(&core.TextField{Name: "notes"}) // internal admin notes
		leads.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
		leads.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})

		if err := app.Save(leads); err != nil {
			return err
		}
	}

	return nil
}

// -----------------------------------------------------------------------------
// Database Seeder
// -----------------------------------------------------------------------------

func seedDatabase(app *pocketbase.PocketBase) error {
	// Always ensure the superadmin exists (survives pb_data wipes)
	superusersColl, _ := app.FindCollectionByNameOrId("_superusers")
	if superusersColl != nil {
		_, suErr := app.FindFirstRecordByData("_superusers", "email", "superadmin@scholarcrafted.com")
		if suErr != nil {
			// Not found — create it
			su := core.NewRecord(superusersColl)
			su.SetEmail("superadmin@scholarcrafted.com")
			su.SetPassword("SuperAdmin2024!")
			if err := app.Save(su); err == nil {
				log.Println("Superadmin created: superadmin@scholarcrafted.com / SuperAdmin2024!")
			} else {
				log.Printf("Superadmin create error: %v", err)
			}
		}
	}

	publishers, err := app.FindCollectionByNameOrId("publishers")
	if err != nil {
		return err
	}

	var count int
	err = app.DB().
		Select("count(*)").
		From(publishers.Name).
		Row(&count)
	if err == nil && count > 0 {
		return nil // Already seeded
	}

	log.Println("Seeding database with default records...")


	usersColl, err := app.FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	// 1. Seed Users
	adminUser := core.NewRecord(usersColl)
	adminUser.Set("username", "admin")
	adminUser.SetEmail("admin@scholarcrafted.com")
	adminUser.SetPassword("password123")
	adminUser.Set("roles", []string{"admin"})
	adminUser.Set("name", "Principal Admin")
	adminUser.Set("sentimentScore", 100)
	adminUser.SetEmailVisibility(true)
	adminUser.SetVerified(true)
	if err := app.Save(adminUser); err != nil {
		return err
	}

	researcherUser := core.NewRecord(usersColl)
	researcherUser.Set("username", "researcher")
	researcherUser.SetEmail("researcher@scholarcrafted.com")
	researcherUser.SetPassword("password123")
	researcherUser.Set("roles", []string{"lead_researcher"})
	researcherUser.Set("name", "Dr. Jane Carter, Ph.D.")
	researcherUser.Set("institution", "NCSU / NC A&T")
	researcherUser.Set("academicNiche", "social_sciences")
	researcherUser.Set("keywords", []string{"ethnography", "qualitative methods", "hip hop culture", "urban studies"})
	researcherUser.SetEmailVisibility(true)
	researcherUser.SetVerified(true)
	if err := app.Save(researcherUser); err != nil {
		return err
	}

	// Real client: Micah Dobson
	clientUser := core.NewRecord(usersColl)
	clientUser.Set("username", "micah")
	clientUser.SetEmail("mpdobson@ncsu.edu")
	clientUser.SetPassword("password123")
	clientUser.Set("roles", []string{"client"})
	clientUser.Set("name", "Dr. Micah Dobson")
	clientUser.Set("institution", "North Carolina State University")
	clientUser.Set("academicNiche", "social_sciences")
	clientUser.Set("keywords", []string{"hip hop culture", "sports management", "public health", "global education"})
	clientUser.Set("sentimentScore", 85)
	clientUser.SetEmailVisibility(true)
	clientUser.SetVerified(true)
	if err := app.Save(clientUser); err != nil {
		return err
	}

	// 2. Seed Publisher
	routledge := core.NewRecord(publishers)
	routledge.Set("name", "Routledge Publishing")
	routledge.Set("website", "https://www.routledge.com")
	routledge.Set("submissionPortal", "https://routledge.submittable.com")
	routledge.Set("primaryContact", "Executive Editor Adams")
	routledge.Set("globalGuidelines", "Chicago Author-Date style bibliography, 12pt Times New Roman, double-spaced.")
	if err := app.Save(routledge); err != nil {
		return err
	}

	// 3. Seed Project Template
	templatesColl, err := app.FindCollectionByNameOrId("project_templates")
	if err != nil {
		return err
	}
	routledgeTemplate := core.NewRecord(templatesColl)
	routledgeTemplate.Set("name", "Routledge Handbook Template")
	routledgeTemplate.Set("publisher", routledge.Id)
	routledgeTemplate.Set("productType", "handbook")
	routledgeTemplate.Set("units", []map[string]interface{}{
		{"title": "Proposal Outline & Scope", "type": "front_matter"},
		{"title": "Global & Perspectives Integration", "type": "technical"},
		{"title": "Reference & Citation Audit", "type": "bibliography"},
	})
	if err := app.Save(routledgeTemplate); err != nil {
		return err
	}

	// 4. Seed Projects
	projectsColl, err := app.FindCollectionByNameOrId("projects")
	if err != nil {
		return err
	}

	// Project A: Routledge Handbook
	projectA := core.NewRecord(projectsColl)
	projectA.Set("title", "Routledge Hip Hop Handbook")
	projectA.Set("slug", "routledge-hip-hop-handbook")
	projectA.Set("client", clientUser.Id)
	projectA.Set("leadResearcher", researcherUser.Id)
	projectA.Set("publisher", routledge.Id)
	projectA.Set("status", "active")
	projectA.Set("nextMilestone", "Incorporate Africa, Latin America & public health references")
	projectA.Set("progress", 80.0)
	projectA.Set("sentimentScore", 90)
	projectA.Set("showOnPortfolio", true)
	projectA.Set("lastContactAt", time.Now().Add(-24*time.Hour))
	projectA.Set("units", []map[string]interface{}{
		{"title": "Scope & Abstract Outlines", "status": "validated", "progress": 100},
		{"title": "Core Manuscript Chapters Drafting", "status": "scholar_review", "progress": 85},
		{"title": "Bibliography & References Check", "status": "internal_review", "progress": 60},
	})
	if err := app.Save(projectA); err != nil {
		return err
	}

	// Project B: Fulbright Scholar Application
	projectB := core.NewRecord(projectsColl)
	projectB.Set("title", "Fulbright Scholar Application")
	projectB.Set("slug", "fulbright-scholar-application")
	projectB.Set("client", clientUser.Id)
	projectB.Set("leadResearcher", researcherUser.Id)
	projectB.Set("status", "active")
	projectB.Set("nextMilestone", "Refine Research Questions & resolve citation gaps")
	projectB.Set("progress", 65.0)
	projectB.Set("sentimentScore", 85)
	projectB.Set("showOnPortfolio", false)
	projectB.Set("lastContactAt", time.Now().Add(-12*time.Hour))
	projectB.Set("units", []map[string]interface{}{
		{"title": "Country Selection Statement", "status": "validated", "progress": 100},
		{"title": "Project Statement & Methodology", "status": "internal_review", "progress": 70},
		{"title": "University Letters of Support", "status": "todo", "progress": 20},
	})
	if err := app.Save(projectB); err != nil {
		return err
	}

	// Project C: Under Armor Sports Lab
	projectC := core.NewRecord(projectsColl)
	projectC.Set("title", "Under Armor Sports Lab Outline")
	projectC.Set("slug", "ua-sports-lab")
	projectC.Set("client", clientUser.Id)
	projectC.Set("leadResearcher", researcherUser.Id)
	projectC.Set("status", "active")
	projectC.Set("nextMilestone", "Complete session design briefs and physical education curriculum mapping")
	projectC.Set("progress", 45.0)
	projectC.Set("sentimentScore", 80)
	projectC.Set("showOnPortfolio", true)
	projectC.Set("lastContactAt", time.Now().Add(-48*time.Hour))
	projectC.Set("units", []map[string]interface{}{
		{"title": "Lab Proposal & Scope", "status": "validated", "progress": 100},
		{"title": "Curriculum Design Drafting", "status": "internal_review", "progress": 40},
	})
	if err := app.Save(projectC); err != nil {
		return err
	}

	// 5. Seed Tasks
	tasksColl, err := app.FindCollectionByNameOrId("tasks")
	if err != nil {
		return err
	}

	// Tasks for Project A (Routledge)
	task1 := core.NewRecord(tasksColl)
	task1.Set("title", "Incorporate African & Latin American Perspectives")
	task1.Set("project", projectA.Id)
	task1.Set("assignedTo", researcherUser.Id)
	task1.Set("status", "in_progress")
	task1.Set("priority", "high")
	task1.Set("due", time.Now().Add(48*time.Hour))
	task1.Set("description", "Integrate global scholars and references into Chapter 2 and 3 methodology outlines to ensure international publishing standards.")
	if err := app.Save(task1); err != nil {
		return err
	}

	task2 := core.NewRecord(tasksColl)
	task2.Set("title", "Verify BibTeX formatting keys")
	task2.Set("project", projectA.Id)
	task2.Set("assignedTo", researcherUser.Id)
	task2.Set("status", "todo")
	task2.Set("priority", "medium")
	task2.Set("due", time.Now().Add(96*time.Hour))
	task2.Set("description", "Verify formatting compliance against Chicago Author-Date standard guidelines.")
	if err := app.Save(task2); err != nil {
		return err
	}

	// Tasks for Project B (Fulbright)
	task3 := core.NewRecord(tasksColl)
	task3.Set("title", "Address country statement gaps")
	task3.Set("project", projectB.Id)
	task3.Set("assignedTo", researcherUser.Id)
	task3.Set("status", "in_progress")
	task3.Set("priority", "high")
	task3.Set("due", time.Now().Add(72*time.Hour))
	task3.Set("description", "Refine the Research Questions sections and resolve missing bibliographies.")
	if err := app.Save(task3); err != nil {
		return err
	}

	// 6. Seed Correspondence
	correspondenceColl, err := app.FindCollectionByNameOrId("correspondence")
	if err != nil {
		return err
	}
	corrRecord := core.NewRecord(correspondenceColl)
	corrRecord.Set("project", projectA.Id)
	corrRecord.Set("author", adminUser.Id)
	corrRecord.Set("target", "client")
	corrRecord.Set("recipientEmail", "mpdobson@ncsu.edu")
	corrRecord.Set("subject", "Weekly Strategic Alignment & Routledge Milestones")
	corrRecord.Set("content", "Dear Micah,\n\nWe have successfully logged Tyler Bunzey's latest manuscript outlines into our database timeline.\n\nWe are executing a full reference audit to integrate African, Latin American, and public health citations as recommended by the press house. Let's touch base next week.\n\nBest,\nVance Lab Operations")
	corrRecord.Set("status", "sent")
	corrRecord.Set("sentAt", time.Now())
	if err := app.Save(corrRecord); err != nil {
		return err
	}

	// 7. Seed Leads (intake pipeline)
	leadsColl, err := app.FindCollectionByNameOrId("leads")
	if err != nil {
		return err
	}

	lead1 := core.NewRecord(leadsColl)
	lead1.Set("name", "Dr. Nelson Malema")
	lead1.Set("email", "nmalema@uwc.ac.za")
	lead1.Set("university", "University of Western Cape")
	lead1.Set("documentType", "book_manuscript")
	lead1.Set("projectStatus", "drafting")
	lead1.Set("targetPublisher", "Routledge")
	lead1.Set("primaryPainPoint", "Support letter validation and local South African hip-hop reference compilation")
	lead1.Set("howHeard", "Micah's referral")
	lead1.Set("status", "new")
	lead1.Set("priority", "high")
	lead1.Set("notes", "Critical leverage for global perspective integration. Support letter drafted from University of Western Cape.")
	if err := app.Save(lead1); err != nil {
		return err
	}

	lead2 := core.NewRecord(leadsColl)
	lead2.Set("name", "Dr. Aisha Patel")
	lead2.Set("email", "a.patel@stanford.edu")
	lead2.Set("university", "Stanford University")
	lead2.Set("documentType", "grant_proposal")
	lead2.Set("projectStatus", "drafting")
	lead2.Set("targetPublisher", "NIH R01")
	lead2.Set("primaryPainPoint", "Specific Aims page needs narrative restructuring before the December grant cycle")
	lead2.Set("howHeard", "Conference referral")
	lead2.Set("status", "new")
	lead2.Set("priority", "high")
	lead2.Set("notes", "Year-end spend opportunity. Budget cycle ends December 31.")
	if err := app.Save(lead2); err != nil {
		return err
	}

	log.Println("Database seeded successfully with Micah Dobson's actual portfolio data.")
	return nil
}

// -----------------------------------------------------------------------------
// AI REST Endpoints (PocketBase v0.39.6 Routing Handler Signature)
// -----------------------------------------------------------------------------

func registerAIEndpoints(e *core.ServeEvent, app *pocketbase.PocketBase) {
	// Middleware checking that user is logged in
	isAuthed := apis.RequireAuth()

	// 1. Sentiment Score Auditor
	e.Router.POST("/api/ai/sentiment", func(re *core.RequestEvent) error {
		type RequestBody struct {
			ProjectID string `json:"projectId"`
			EmailLogs string `json:"emailLogs"`
		}

		var req RequestBody
		if err := re.BindBody(&req); err != nil {
			return apis.NewBadRequestError("Invalid request body", err)
		}

		project, err := app.FindRecordById("projects", req.ProjectID)
		if err != nil {
			return apis.NewNotFoundError("Project not found", err)
		}

		sentimentScore := 85
		logsLower := strings.ToLower(req.EmailLogs)
		if strings.Contains(logsLower, "delay") || strings.Contains(logsLower, "frustrated") || strings.Contains(logsLower, "disagree") {
			sentimentScore = 40
		} else if strings.Contains(logsLower, "thanks") || strings.Contains(logsLower, "great") || strings.Contains(logsLower, "excellent") {
			sentimentScore = 95
		}

		project.Set("progress", float64(sentimentScore))
		if err := app.Save(project); err != nil {
			return apis.NewBadRequestError("Failed to update project progress", err)
		}

		auditCollection, err := app.FindCollectionByNameOrId("audit_logs")
		if err == nil {
			logRecord := core.NewRecord(auditCollection)
			logRecord.Set("project", project.Id)
			logRecord.Set("stream", "lifecycle")
			logRecord.Set("eventType", "sentiment_alert")
			logRecord.Set("importance", "medium")
			logRecord.Set("payload", map[string]interface{}{
				"score":      sentimentScore,
				"analyzedAt": time.Now().Format(time.RFC3339),
			})
			_ = app.Save(logRecord)
		}

		return re.JSON(http.StatusOK, map[string]interface{}{
			"success":        true,
			"sentimentScore": sentimentScore,
			"status":         "updated",
		})
	}).Bind(isAuthed)

	// 2. AI Email Correspondence Draft helper
	e.Router.POST("/api/ai/draft-email", func(re *core.RequestEvent) error {
		type RequestBody struct {
			ProjectID    string `json:"projectId"`
			Tone         string `json:"tone"`
			Instructions string `json:"instructions"`
		}

		var req RequestBody
		if err := re.BindBody(&req); err != nil {
			return apis.NewBadRequestError("Invalid request body", err)
		}

		var subject, body string
		switch req.Tone {
		case "empathetic":
			subject = "Reaching Out: Adjusting Our Sprint Timeline"
			body = "Dear Researcher,\n\nWe recognize the immense pressure of the writing phase. Let's adjust the milestone roadmap so you can focus on Chapter 3 with structured guidance."
		case "rigorous":
			subject = "Methodological Review Comments: Chapter 4"
			body = "Dear Researcher,\n\nWe have performed a structure and reference audit on Chapter 4. Please review the comments regarding the data coding scheme."
		default:
			subject = "White-Glove Executive Check-in"
			body = "Dear Researcher,\n\nI have reviewed the typeset proofs for your Routledge handbook. The formatting matches house style guidelines."
		}

		return re.JSON(http.StatusOK, map[string]interface{}{
			"success": true,
			"subject": subject,
			"content": body,
		})
	}).Bind(isAuthed)

	// 3. BibTeX Citation Auditor
	e.Router.POST("/api/ai/reference-audit", func(re *core.RequestEvent) error {
		type RequestBody struct {
			BibTeXContent string `json:"bibtex"`
			MarkdownText  string `json:"markdown"`
		}

		var req RequestBody
		if err := re.BindBody(&req); err != nil {
			return apis.NewBadRequestError("Invalid request body", err)
		}

		var bibKeys []string
		lines := strings.Split(req.BibTeXContent, "\n")
		for _, line := range lines {
			line = strings.TrimSpace(line)
			if strings.HasPrefix(line, "@") {
				parts := strings.Split(line, "{")
				if len(parts) > 1 {
					keyPart := strings.TrimSpace(parts[1])
					keyPart = strings.TrimSuffix(keyPart, ",")
					bibKeys = append(bibKeys, keyPart)
				}
			}
		}

		missingCitations := []string{}
		words := strings.Fields(req.MarkdownText)
		for _, word := range words {
			if strings.Contains(word, "[@") {
				key := strings.Split(word, "[@")[1]
				key = strings.Split(key, "]")[0]
				key = strings.TrimSpace(key)
				found := false
				for _, bk := range bibKeys {
					if bk == key {
						found = true
						break
					}
				}
				if !found {
					missingCitations = append(missingCitations, key)
				}
			}
		}

		healthScore := 100
		if len(missingCitations) > 0 {
			healthScore = 100 - (len(missingCitations) * 15)
			if healthScore < 10 {
				healthScore = 10
			}
		}

		return re.JSON(http.StatusOK, map[string]interface{}{
			"success":          true,
			"healthScore":      healthScore,
			"missingCitations": missingCitations,
			"totalParsedKeys":  len(bibKeys),
		})
	}).Bind(isAuthed)

	// 4. Global Inbound "CC" Mailbox Logger
	e.Router.POST("/api/correspondence/cc", func(re *core.RequestEvent) error {
		type RequestBody struct {
			Sender         string `json:"sender"`
			RecipientEmail string `json:"recipientEmail"`
			Subject        string `json:"subject"`
			Content        string `json:"content"`
			ProjectID      string `json:"projectId"`
			Status         string `json:"status"` // e.g. "sent", "pending_approval"
		}

		var req RequestBody
		if err := re.BindBody(&req); err != nil {
			return apis.NewBadRequestError("Invalid request body", err)
		}

		if req.Sender == "" || req.Subject == "" || req.Content == "" {
			return apis.NewBadRequestError("Missing required fields: sender, subject, content", nil)
		}

		if req.Status == "" {
			req.Status = "sent"
		}

		var project *core.Record

		// A. Find by specific projectId if provided
		if req.ProjectID != "" {
			project, _ = app.FindRecordById("projects", req.ProjectID)
		}

		// B. Match by sender email
		if project == nil && req.Sender != "" {
			senderUser, uErr := app.FindFirstRecordByData("users", "email", req.Sender)
			if uErr == nil && senderUser != nil {
				projs, pErr := app.FindRecordsByFilter("projects", "client = {:userId} || leadResearcher = {:userId}", "-created", 1, 0, map[string]any{"userId": senderUser.Id})
				if pErr == nil && len(projs) > 0 {
					project = projs[0]
				}
			}
		}

		// C. Match by keywords in subject or body
		if project == nil {
			projs, pErr := app.FindRecordsByFilter("projects", "id != ''", "-created", 100, 0, nil)
			if pErr == nil {
				subjectLower := strings.ToLower(req.Subject)
				bodyLower := strings.ToLower(req.Content)
				bestScore := 0
				var bestProj *core.Record

				for _, p := range projs {
					score := 0
					titleLower := strings.ToLower(p.GetString("title"))
					slugLower := strings.ToLower(p.GetString("slug"))

					// Tokenize title
					words := strings.Fields(titleLower)
					for _, w := range words {
						if len(w) > 3 {
							if strings.Contains(subjectLower, w) {
								score += 10
							}
							if strings.Contains(bodyLower, w) {
								score += 2
							}
						}
					}

					if strings.Contains(subjectLower, slugLower) {
						score += 20
					}

					if score > bestScore {
						bestScore = score
						bestProj = p
					}
				}

				if bestScore > 0 {
					project = bestProj
				}
			}
		}

		// D. Fallback to first project
		if project == nil {
			projs, pErr := app.FindRecordsByFilter("projects", "id != ''", "-created", 1, 0, nil)
			if pErr == nil && len(projs) > 0 {
				project = projs[0]
			}
		}

		if project == nil {
			return apis.NewBadRequestError("No project found to associate with this email", nil)
		}

		// Resolve or create author user
		var authorId string
		senderUser, uErr := app.FindFirstRecordByData("users", "email", req.Sender)
		if uErr == nil && senderUser != nil {
			authorId = senderUser.Id
		} else {
			adminUser, aErr := app.FindFirstRecordByData("users", "username", "admin")
			if aErr == nil && adminUser != nil {
				authorId = adminUser.Id
			} else {
				authorId = project.GetString("leadResearcher")
			}
		}

		corrColl, cErr := app.FindCollectionByNameOrId("correspondence")
		if cErr != nil {
			return apis.NewBadRequestError("Correspondence collection not found", cErr)
		}

		corrRec := core.NewRecord(corrColl)
		corrRec.Set("project", project.Id)
		corrRec.Set("author", authorId)
		corrRec.Set("target", "client")
		if strings.Contains(strings.ToLower(req.RecipientEmail), "publisher") || strings.Contains(strings.ToLower(req.Subject), "publisher") {
			corrRec.Set("target", "publisher")
		}

		if req.RecipientEmail != "" {
			corrRec.Set("recipientEmail", req.RecipientEmail)
		} else {
			clientRecord, clErr := app.FindRecordById("users", project.GetString("client"))
			if clErr == nil {
				corrRec.Set("recipientEmail", clientRecord.Email())
			} else {
				corrRec.Set("recipientEmail", "client@scholarcrafted.com")
			}
		}

		corrRec.Set("subject", req.Subject)
		corrRec.Set("content", req.Content)
		corrRec.Set("status", req.Status)
		if req.Status == "sent" {
			corrRec.Set("sentAt", time.Now())
		}

		if err := app.Save(corrRec); err != nil {
			return apis.NewBadRequestError("Failed to save logged correspondence", err)
		}

		return re.JSON(http.StatusOK, map[string]any{
			"success":          true,
			"correspondenceId": corrRec.Id,
			"matchedProjectId": project.Id,
			"matchedTitle":     project.GetString("title"),
			"status":           corrRec.GetString("status"),
		})
	})

	// 5. Friday Status Pulse generator
	e.Router.POST("/api/ai/friday-pulse", func(re *core.RequestEvent) error {
		type RequestBody struct {
			ProjectID string `json:"projectId"`
		}

		var req RequestBody
		if err := re.BindBody(&req); err != nil {
			return apis.NewBadRequestError("Invalid request body", err)
		}

		if req.ProjectID == "" {
			return apis.NewBadRequestError("Missing projectId parameter", nil)
		}

		project, err := app.FindRecordById("projects", req.ProjectID)
		if err != nil {
			return apis.NewNotFoundError("Project not found", err)
		}

		// Fetch tasks for summary
		tasks, _ := app.FindRecordsByFilter("tasks", "project = {:projectId}", "-updated", 100, 0, map[string]any{"projectId": project.Id})

		var completedItems []string
		var activeItems []string
		var upcomingItems []string

		for _, t := range tasks {
			title := t.GetString("title")
			switch t.GetString("status") {
			case "completed":
				completedItems = append(completedItems, "- Done: "+title)
			case "in_progress":
				activeItems = append(activeItems, "- In Progress: "+title)
			default:
				upcomingItems = append(upcomingItems, "- Planned: "+title)
			}
		}

		if len(completedItems) == 0 {
			completedItems = append(completedItems, "- Reviewed target journal guidelines and verified standard bibliographic formatting.")
		}
		if len(activeItems) == 0 {
			activeItems = append(activeItems, "- Formulating the draft methodology codebook validation procedures.")
		}
		if len(upcomingItems) == 0 {
			upcomingItems = append(upcomingItems, "- Comprehensive peer reference alignment pass.")
		}

		// Fetch project's client email
		recipientEmail := "client@scholarcrafted.com"
		clientRecord, clErr := app.FindRecordById("users", project.GetString("client"))
		if clErr == nil {
			recipientEmail = clientRecord.Email()
		}

		// Build beautiful, bespoke Status Pulse email content
		subject := fmt.Sprintf("Friday Status Pulse: %s Update", project.GetString("title"))
		var sb strings.Builder
		sb.WriteString(fmt.Sprintf("Dear Dr. %s,\n\n", clientRecord.GetString("name")))
		sb.WriteString(fmt.Sprintf("Here is your curated weekly **Friday Status Pulse** for **%s**:\n\n", project.GetString("title")))
		sb.WriteString(fmt.Sprintf("### 📈 Overall Status\n- Current Phase Progress: **%.0f%%**\n- Next Strategic Milestone: *%s*\n\n", project.GetFloat("progress"), project.GetString("nextMilestone")))
		sb.WriteString("### ✅ Completed This Week\n")
		for _, item := range completedItems {
			sb.WriteString(item + "\n")
		}
		sb.WriteString("\n### ⏳ In Progress\n")
		for _, item := range activeItems {
			sb.WriteString(item + "\n")
		}
		sb.WriteString("\n### 🎯 Upcoming Next Steps\n")
		for _, item := range upcomingItems {
			sb.WriteString(item + "\n")
		}
		sb.WriteString("\n---\n*This is an automated white-glove update drafted for your immediate review. If everything looks good, this correspondence will be cleared and delivered to your inbox.*")

		content := sb.String()

		// Save the compiled status pulse to correspondence as a "pending_approval" draft (the Buffer communication architecture!)
		authorId := ""
		if re.Auth != nil {
			authorId = re.Auth.Id
		} else {
			adminUser, _ := app.FindFirstRecordByData("users", "username", "admin")
			if adminUser != nil {
				authorId = adminUser.Id
			} else {
				authorId = project.GetString("leadResearcher")
			}
		}

		corrColl, cErr := app.FindCollectionByNameOrId("correspondence")
		if cErr != nil {
			return apis.NewBadRequestError("Correspondence collection not found", cErr)
		}

		corrRec := core.NewRecord(corrColl)
		corrRec.Set("project", project.Id)
		corrRec.Set("author", authorId)
		corrRec.Set("target", "client")
		corrRec.Set("recipientEmail", recipientEmail)
		corrRec.Set("subject", subject)
		corrRec.Set("content", content)
		corrRec.Set("status", "pending_approval") // needs manual admin clearance!

		if err := app.Save(corrRec); err != nil {
			return apis.NewBadRequestError("Failed to save draft status pulse", err)
		}

		return re.JSON(http.StatusOK, map[string]any{
			"success":          true,
			"correspondenceId": corrRec.Id,
			"subject":          subject,
			"content":          content,
		})
	}).Bind(isAuthed)
}

// -----------------------------------------------------------------------------
// Database Hooks (Phase 2 - Automation & Audit Streams)
// -----------------------------------------------------------------------------

func registerHooks(app *pocketbase.PocketBase) {
	// 1+2. Correspondence hooks — BOTH handlers merged per event so chain executes correctly.
	// BindFunc does NOT auto-call e.Next(); every handler must call it or the chain breaks.
	app.OnRecordAfterCreateSuccess("correspondence").BindFunc(func(e *core.RecordEvent) error {
		if err := handleCorrespondenceSent(e); err != nil {
			log.Printf("handleCorrespondenceSent create error: %v", err)
		}
		if err := handleClearanceAlert(e); err != nil {
			log.Printf("handleClearanceAlert create error: %v", err)
		}
		return e.Next()
	})
	app.OnRecordAfterUpdateSuccess("correspondence").BindFunc(func(e *core.RecordEvent) error {
		if err := handleCorrespondenceSent(e); err != nil {
			log.Printf("handleCorrespondenceSent update error: %v", err)
		}
		if err := handleClearanceAlert(e); err != nil {
			log.Printf("handleClearanceAlert update error: %v", err)
		}
		return e.Next()
	})

	// 3. Task completion audit logger
	app.OnRecordAfterUpdateSuccess("tasks").BindFunc(func(e *core.RecordEvent) error {
		task := e.Record
		if task.GetString("status") == "completed" {
			auditCollection, err := e.App.FindCollectionByNameOrId("audit_logs")
			if err == nil {
				logRecord := core.NewRecord(auditCollection)
				logRecord.Set("project", task.GetString("project"))
				logRecord.Set("stream", "technical")
				logRecord.Set("eventType", "git_sync")
				logRecord.Set("importance", "medium")
				logRecord.Set("payload", map[string]interface{}{
					"taskId":    task.Id,
					"taskTitle": task.GetString("title"),
					"completed": true,
					"message":   "Task completed: " + task.GetString("title"),
				})
				if err := e.App.Save(logRecord); err != nil {
					log.Printf("task audit log save error: %v", err)
				}
			}
		}
		return e.Next()
	})

	// 4. Project status/progress audit logger
	app.OnRecordAfterUpdateSuccess("projects").BindFunc(func(e *core.RecordEvent) error {
		project := e.Record
		auditCollection, err := e.App.FindCollectionByNameOrId("audit_logs")
		if err == nil {
			logRecord := core.NewRecord(auditCollection)
			logRecord.Set("project", project.Id)
			logRecord.Set("stream", "technical")
			logRecord.Set("eventType", "wasm_render")
			logRecord.Set("importance", "low")
			logRecord.Set("payload", map[string]interface{}{
				"projectId": project.Id,
				"progress":  project.GetFloat("progress"),
				"status":    project.GetString("status"),
				"message":   "Project progress updated to " + project.GetString("status"),
			})
			if err := e.App.Save(logRecord); err != nil {
				log.Printf("project audit log save error: %v", err)
			}
		}
		return e.Next()
	})
}

func handleCorrespondenceSent(e *core.RecordEvent) error {
	corr := e.Record
	if corr.GetString("status") != "sent" {
		return nil
	}

	projectID := corr.GetString("project")
	if projectID == "" {
		return nil
	}

	project, err := e.App.FindRecordById("projects", projectID)
	if err != nil {
		return nil
	}

	// Calculate sentiment based on content keywords
	content := strings.ToLower(corr.GetString("content"))
	sentimentScore := 85
	if strings.Contains(content, "delay") || strings.Contains(content, "frustrated") || strings.Contains(content, "apologize") || strings.Contains(content, "sorry") {
		sentimentScore = 60
	} else if strings.Contains(content, "thanks") || strings.Contains(content, "great") || strings.Contains(content, "excellent") || strings.Contains(content, "perfect") {
		sentimentScore = 95
	}

	// Update project contact and sentiment
	project.Set("lastContactAt", time.Now())
	project.Set("sentimentScore", sentimentScore)
	if err := e.App.Save(project); err != nil {
		return err
	}

	// Update client user sentiment
	clientID := project.GetString("client")
	if clientID != "" {
		clientUser, err := e.App.FindRecordById("users", clientID)
		if err == nil {
			clientUser.Set("sentimentScore", sentimentScore)
			_ = e.App.Save(clientUser)
		}
	}

	// Create technical/lifecycle audit log for the sent email
	auditCollection, err := e.App.FindCollectionByNameOrId("audit_logs")
	if err == nil {
		logRecord := core.NewRecord(auditCollection)
		logRecord.Set("project", project.Id)
		logRecord.Set("stream", "lifecycle")
		logRecord.Set("eventType", "email_in") // email log entry
		logRecord.Set("importance", "low")
		logRecord.Set("payload", map[string]interface{}{
			"correspondenceId": corr.Id,
			"subject":          corr.GetString("subject"),
			"sentimentScore":   sentimentScore,
			"message":          "Correspondence sent to " + corr.GetString("recipientEmail"),
		})
		_ = e.App.Save(logRecord)
	}

	return nil
}

func handleClearanceAlert(e *core.RecordEvent) error {
	corr := e.Record
	log.Printf("handleClearanceAlert fired: status=%s, project=%s", corr.GetString("status"), corr.GetString("project"))
	if corr.GetString("status") != "pending_approval" {
		log.Printf("handleClearanceAlert: status is not pending_approval, exiting")
		return nil
	}

	projectID := corr.GetString("project")
	if projectID == "" {
		log.Printf("handleClearanceAlert: projectID is empty, exiting")
		return nil
	}

	project, err := e.App.FindRecordById("projects", projectID)
	if err != nil {
		log.Printf("handleClearanceAlert: FindRecordById error: %v", err)
		return nil
	}

	// Create clearance alert in lifecycle audit log
	auditCollection, err := e.App.FindCollectionByNameOrId("audit_logs")
	if err == nil {
		logRecord := core.NewRecord(auditCollection)
		logRecord.Set("project", project.Id)
		logRecord.Set("stream", "lifecycle")
		logRecord.Set("eventType", "sentiment_alert") // represent clearance alert
		logRecord.Set("importance", "high")
		logRecord.Set("payload", map[string]interface{}{
			"correspondenceId": corr.Id,
			"subject":          corr.GetString("subject"),
			"message":          "NEW EMAIL PENDING CLEARANCE: " + corr.GetString("subject") + " for " + project.GetString("title"),
		})
		if err := e.App.Save(logRecord); err != nil {
			log.Printf("ERROR SAVING CLEARANCE AUDIT LOG: %v", err)
		} else {
			log.Printf("SUCCESSFULLY SAVED CLEARANCE AUDIT LOG")
		}
	}

	return nil
}
