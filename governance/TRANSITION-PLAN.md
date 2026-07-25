# Field Manual Website Transition Plan

## Objective

Move the **existing, approved working Culinary Arts 1 & 2 Student Field Manual website** into this GitHub repository without redesigning or recreating it.

The current site's code, visual system, navigation, content structure, responsive behavior, and editorial decisions are the migration baseline. The purpose of the transition is to place that exact working implementation under durable version control so the team can maintain, review, and improve it collaboratively.

## Non-Negotiable Migration Rule

This is a **code migration, not a new website build**.

- Preserve the current working site's HTML, CSS, JavaScript, assets, navigation, layout, and content.
- Preserve the edits and visual decisions completed during the most recent review cycle.
- Do not replace the existing design with a new framework, theme, template, or information architecture.
- Do not simplify, reorganize, or rewrite working pages merely to make them easier to migrate.
- Any future redesign or structural change must occur only after the exact current site has been imported, verified, and preserved in Git history.

## Migration Sequence

### 1. Capture the Exact Current Site

Obtain the complete current working site package, including:

- all HTML or application source files;
- CSS and design assets;
- JavaScript and interactive behavior;
- images, icons, and local media;
- fonts or font references;
- downloadable resources;
- configuration files;
- build or dependency files, if used;
- the current folder and routing structure.

The imported version must render the same as the current working version before any content conversion or architectural cleanup begins.

### 2. Preserve a Baseline Snapshot

- Commit the imported site as an identifiable migration baseline.
- Record its source, date, and status.
- Preserve screenshots or a visual review record for major pages.
- Tag the exact imported state before further development.

### 3. Verify Migration Fidelity

Confirm that the GitHub-hosted copy preserves:

- page layout and spacing;
- typography and visual hierarchy;
- navigation and cross-links;
- recipe-card presentation;
- mobile and Chromebook behavior;
- print behavior;
- downloads and internal assets;
- accessibility features already present;
- all edits accepted during the latest review.

Migration is not complete until the repository version matches the current working site.

### 4. Add Editable Content Architecture Behind the Existing Site

After the exact site is safely preserved, progressively separate reusable content from presentation where doing so improves maintainability without changing the approved experience.

- Structured source files may contain approved instructional content.
- Reusable data files may contain recipes, glossary terms, quick-reference tables, chapter metadata, and cross-links.
- Existing pages and components remain the presentation baseline.
- Refactoring must be visually and functionally neutral unless a separate change is reviewed and approved.
- Word and PDF editions remain baseline references or release artifacts.

## Recommended Repository Structure

The exact imported site structure should be preserved first. Supporting materials may then be organized around it:

```text
site/                         # exact migrated working site
manual/                       # editable manual source and reference editions
recipe-book/                  # recipe source and structured records
sources/
  curriculum/
  assessment/
  project-context/
governance/
public/                       # shared public assets/downloads where applicable
.github/                      # collaboration and Actions workflows
```

The imported site should not be forced into this proposed structure if doing so would alter or break it. Preserve first; refactor later.

## Source Materials to Retain

### Primary Baselines

- Current working website code and assets
- Current Field Manual working master
- Field Manual Version 1.0 historical reference
- Culinary Recipe Book V2

### Instructional and Design Sources

- Culinary Arts 1 & 2 course outline
- Advanced Culinary scope and sequence
- Culinary Pathway Skills Map
- GCSD Culinary Employability Profile
- Culinary Pathway Design Interview Transcript
- approved visual and editorial review notes from the current site

## Recipe-Book Integration

The original recipe-book PDF remains an authoritative reference during migration.

Recipes may later become structured records containing, as available:

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

This conversion must not change the current site's approved recipe-card design without a separate review.

## Collaboration Controls

- Preserve the imported baseline on `main` or in a tagged release before substantive changes.
- Use branches and pull requests for later revisions.
- Require reviewers to distinguish migration corrections from proposed design changes.
- Keep unrelated changes out of migration pull requests.
- Add checks for broken links, missing files, and build failures.

## GitHub Actions

Actions should support the current site rather than replace its workflow.

Recommended workflows:

- validate links and required assets;
- build the existing site using its current toolchain, if any;
- generate a preview for pull requests;
- deploy the approved branch to GitHub Pages;
- verify that the deployed artifact contains only approved public content;
- create versioned release packages when appropriate.

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

1. the exact current working site code and assets exist in this repository;
2. the repository version renders and functions like the current working version;
3. the accepted edits from the most recent review are preserved;
4. the migrated baseline is committed and tagged before refactoring;
5. team members can propose and review later changes through pull requests;
6. automated checks protect the existing site from regression;
7. GitHub Pages deploys the preserved site successfully;
8. editable manual and recipe content can evolve behind the existing approved presentation without silently creating a different website.
