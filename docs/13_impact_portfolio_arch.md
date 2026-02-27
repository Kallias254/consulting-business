# 13: Impact Portfolio Architecture - Hosting Client Sites

## The "Data-to-Site" Workflow
We don't build separate websites for every client. Instead, we use a **Multi-tenant Rendering** approach within our Payload/Next.js engine.

### 1. The "Portfolios" Collection
- In Payload, we create a `Portfolios` collection. 
- It links to a `Client` and their `Projects`.
- It contains fields for: Bio, Research Interests, Profile Picture, and Social Links.

### 2. The Dynamic Renderer
- We create a "Theme" in Next.js (clean, academic, minimalist).
- **The URL:** `scholar.yourconsultancy.com/[client-slug]`
- **Custom Domains:** If a client wants `dr-smith.com`, we point that domain to our server. Our Next.js middleware detects the domain and renders the correct `Portfolio` data.

## 3. The "Impact Portfolio" (Automatic Syncing)
The primary value of the retainer is that the client's public site is **always current** without them touching it.

### A. The "Talks & Appearances" Collection
- **In Payload:** We create a `Talks` collection.
- **Fields:** Title, Date, Venue, Abstract, and "Public Status" (Upcoming vs. Past).
- **Automation:** 
    - When a client is invited to a talk, they (or Micah) can simply forward the email to the Project Inbox.
    - You (the Editor) log the talk in Payload.
    - **Result:** The "Upcoming Talks" section of their website updates instantly. After the date passes, it automatically moves to "Past Presentations."

### B. The "Project Feed" (Working in Public)
- **The Workflow:** Instead of waiting for a book to be published, we show the *momentum*.
- **The Switch:** In the `Projects` collection, there is a toggle: `Show on Public Portfolio`.
- **States:** 
    - **In Progress:** "Currently working on a CRC Press volume regarding [Topic]..."
    - **Complete:** "Published: [Title] - [Link to Publisher]."
- **Why?** It shows the academic community that the researcher is active, which is crucial for grant applications and tenure reviews.

### 4. The "Prime Client" Strategy: The Micah Showcase
To empower Micah's advocacy, we treat his own academic presence as the "Gold Standard" implementation of our system. This gives him a high-status "living demo" to show peers.

### A. The "Micah Example" Portfolio
- **URL:** `micah.yourconsultancy.com` (or his professional domain).
- **Purpose:** When Micah is in a conversation with a colleague, he doesn't just "talk" about the service—he shows his own site. 
- **The "Check this out" Moment:** "I actually have my team manage my publication feed and talk schedule through this private system. It saves me 10 hours a month."

### B. "Working in Public" for Advocacy
- We will use Micah's current projects (grants, books, talks) to populate his portfolio using the **Agency OS**.
- This serves as a "Case Study in Real Time." Prospective clients see that the Principal uses the exact same infrastructure they are being offered.

---

## 5. Why this is "Scientist-as-a-Service"
- We aren't selling a website; we are selling a **Self-Updating Academic Legacy**.
- **The "Low Friction" Win:** The client doesn't need to learn a CMS or edit HTML. They just keep working with you, and their digital presence follows their real-world progress.
