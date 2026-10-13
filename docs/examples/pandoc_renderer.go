package main

import (
	"bytes"
	"fmt"
	"log"
	"os/exec"
)

// RenderDocument uses Pandoc (via os/exec) to transform a markdown file into a fully 
// styled Word Document (.docx) or PDF based on a reference template.
// This handles the AST transformation flawlessly without manual formatting.
func RenderDocument(inputFile, outputFile, referenceDoc string) error {
	log.Printf("Starting Pandoc AST transformation: %s -> %s", inputFile, outputFile)

	// Build the Pandoc command arguments
	// Example: pandoc input.md -o output.docx --reference-doc=custom-template.docx
	args := []string{
		inputFile,
		"-o", outputFile,
	}

	// Apply a reference template if provided (vital for university/publisher compliance)
	if referenceDoc != "" {
		args = append(args, fmt.Sprintf("--reference-doc=%s", referenceDoc))
	}

	// Invoke Pandoc from the system
	cmd := exec.Command("pandoc", args...)

	// Capture standard error for debugging
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	// Execute the command
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("pandoc execution failed: %v\nStderr: %s", err, stderr.String())
	}

	log.Println("Document successfully rendered!")
	return nil
}

func main() {
	// Example Usage:
	// Assuming a client uploaded a draft, we converted it to markdown internally, 
	// and now we want to output a perfectly styled Routledge-compliant DOCX.
	
	input := "drafts/chapter_1_raw.md"
	output := "deliverables/chapter_1_formatted.docx"
	template := "templates/routledge_reference.docx"

	err := RenderDocument(input, output, template)
	if err != nil {
		log.Fatalf("Error rendering document: %v", err)
	}
}
