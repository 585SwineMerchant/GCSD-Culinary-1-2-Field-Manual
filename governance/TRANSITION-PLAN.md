# Field Manual Website Transition Plan

## Objective

Move the Culinary Arts 1 & 2 Student Field Manual from a primarily Word-based publication into a maintainable GitHub environment that supports collaboration, review, automated builds, and a student-facing website.

## Architectural Direction

The repository should separate content from presentation.

- Structured source files contain the approved instructional content.
- Reusable data files contain recipes, glossary terms, quick-reference tables, chapter metadata, and cross-links.
- The website renders those sources consistently.
- Word and PDF editions are generated release artifacts or preserved baseline references.

## Recommended Content Structure

```text
content/
  chapters/
    01-becoming-a-culinary-professional.md
    02-kitchen-safety.md
    03-food-safety-and-sanitation.md
    ...
  appendices/
  glossary/
  student-tools/
data/
  recipes/
  equipment/
  standards/
  navigation/
public/
  images/
  downloads/
site/
  components/
  layouts/
  styles/
```

## Initial Migration Work Packages

### 1. Preserve the Baseline

- Retain Version 1.0 as the historical reference edition.
- Retain the current working master separately.
- Record version, date, status, and source location.

### 2. Convert the Manual into Editable Source

- Divide the manual into one Markdown file per chapter.
- Preserve headings, tables, callouts, check-for-understanding questions, and student tools.
- Assign stable chapter IDs and filenames.
- Add metadata for title, section, status, review date, and related recipes.

### 3. Normalize the Recipe Book

Each recipe should become a structured record containing, as available:

- recipe title;
- unit or chapter connection;
- yield and portion size;
- ingredients with amounts and units;
- procedure;
- equipment;
- mise en place;
- safety and sanitation controls;
- allergen information;
- quality standard;
- scaling notes;
- source and revision status.

The original recipe-book PDF remains a reference while recipes are cleaned and verified individually.

### 4. Establish Review Controls

- Require branches and pull requests for substantive changes.
- Use issue templates for corrections, recipe revisions, accessibility findings, and proposed chapter changes.
- Add content checks for broken links, missing metadata, duplicate IDs, and accessibility basics.

### 5. Build the Student Website

The first website release should prioritize:

- clear chapter navigation;
- search;
- recipe cards;
- print-friendly recipes and student tools;
- mobile and Chromebook usability;
- accessible headings, contrast, alt text, keyboard navigation, and readable tables;
- links between chapters, recipes, and classroom tools.

The website is intended primarily for preparation, review, planning, and reflection before and after labs—not as a real-time kitchen operations dashboard.

### 6. Add GitHub Actions

Recommended workflows:

- validate Markdown and links on pull requests;
- validate recipe-data fields;
- build a preview site for review;
- deploy the approved main branch to GitHub Pages;
- create versioned release packages containing the website build and approved downloadable documents.

## Items That Should Not Be Publicly Committed

- student-identifiable information;
- individual evaluations or portfolios;
- confidential district records;
- account credentials, tokens, or passwords;
- copyrighted commercial curriculum that the district lacks permission to redistribute;
- restricted assessment items;
- private contact information not already approved for publication.

## Definition of a Successful Transition

The transition is complete when:

1. the complete approved manual exists as editable structured repository source;
2. recipes are stored as maintainable records rather than only a static PDF;
3. team members can propose and review changes through pull requests;
4. automated checks protect structure and accessibility;
5. the student website is built and deployed from the repository;
6. Word and PDF editions can be reproduced or released without manually rebuilding the entire publication.
