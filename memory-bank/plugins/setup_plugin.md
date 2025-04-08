# SETUP/MAINTENANCE PLUGIN

> ⚠️ **MANDATORY:**
> You **MUST ACTUALLY EDIT FILES** using the write_file, edit_file, or create_directory tools.
> **DO NOT just check boxes - you must use the file editing tools to make changes.**
> **Never** proceed to the next step or phase transition **without** actually editing files.

╔═══════════════════════════════════════════════╗
║              SETUP/MAINTENANCE                ║
║                                               ║
║  Initialize  -->  Identify  -->  Populate     ║
║  Core Files      Code Roots    Trackers       ║
╚═══════════════════════════════════════════════╝

## ENTERING/EXITING THIS PHASE

**Enter if**:
- `memorybankrules.md` shows `CURRENT_PHASE: Setup/Maintenance`
- `memorybankrules.md` is missing (initial setup)

**Exit when**:
- All core files exist and are initialized
- Code root directories are identified
- Dependency trackers are populated with no placeholders

**Exit action**:
You MUST use write_file or edit_file to update memorybankrules.md with:
```
<PHASE_MARKER>
CURRENT_PHASE: Setup/Maintenance
NEXT_PHASE: Strategy
LAST_ACTION: Completed Setup/Maintenance Phase
NEXT_ACTION: Transition to Strategy Phase
REQUIRED_BEFORE_TRANSITION: User Action Required
</PHASE_MARKER>
```

## CORE FILE INITIALIZATION

**Required files**:
- `memorybankrules.md`: Phase management
- `memory-bank/projectbrief.md`: Project goals
- `memory-bank/activeContext.md`: Current state
- `memory-bank/dependency_tracker.md`: Module dependencies
- `memory-bank/progress.md`: Progress tracking

**Creation procedure**:
1. Use read_file to check if each file exists
2. For missing files, use write_file or create_directory to create:
   - First create the memory-bank directory if needed:
     ```
     create_directory("memory-bank")
     ```
   
   - For `memorybankrules.md`, use write_file:
     ```
     write_file("memorybankrules.md", "<PHASE_MARKER>\nCURRENT_PHASE: Setup/Maintenance\nNEXT_PHASE: Setup/Maintenance\nLAST_ACTION: System Initialized\nNEXT_ACTION: Create/Update Core files\nREQUIRED_BEFORE_TRANSITION: Core Files Creation\n</PHASE_MARKER>\n\n<CODE_ROOT_DIRECTORIES>\n- [list to be populated]\n\n<LEARNING_JOURNAL>\n- Initial setup on [current date]")
     ```
   
   - For other files, use write_file to create with appropriate headers
   - After creating each file, use read_file to verify it was correctly created

## CODE ROOT IDENTIFICATION

1. Use list_directory or read_file to scan project root directory
2. **Include directories** with:
   - Source code files (.py, .js, etc.)
   - Project-specific logic
   
3. **Exclude directories** like:
   - `.git`, `.vscode` (configuration)
   - `venv`, `node_modules` (dependencies)
   - `build`, `dist` (outputs)
   - `docs` (documentation)

4. Use write_file or edit_file to update `memorybankrules.md`:
   ```
   <CODE_ROOT_DIRECTORIES>
   - src
   - utils
   - [other identified directories]
   ```

5. Verify the update by reading the file back:
   ```
   read_file("memorybankrules.md")
   ```

## DEPENDENCY TRACKER CREATION

1. Use write_file to create tracker structure:
   ```
   write_file("memory-bank/dependency_tracker.md", "<DEP_MATRIX_START>\n# KEY DEFINITIONS\nK1: src/module_a\nK2: src/module_b\n\n# MATRIX (Row depends on Column)\n# Symbols: > (depends on), < (depended by), x (mutual), - (none), d (doc)\n    | K1 | K2 |\nK1  | -  | -  |\nK2  | -  | -  |\n<DEP_MATRIX_END>")
   ```

2. Identify modules and files from code roots
3. Use edit_file to update KEY DEFINITIONS with identified modules
4. Analyze code to identify dependencies:
   - Imports between modules
   - Function calls between modules
   - Documentation references
5. Use edit_file to update MATRIX with appropriate symbols
6. Verify all updates using read_file

## SETUP/MAINTENANCE MUP - REQUIRED FILE MODIFICATIONS

After EVERY significant action in the Setup/Maintenance phase, you MUST:

1. Use write_file or edit_file to update `memorybankrules.md` with:
   ```
   <PHASE_MARKER>
   CURRENT_PHASE: Setup/Maintenance
   NEXT_PHASE: [appropriate next phase]
   LAST_ACTION: [description of what you just did]
   NEXT_ACTION: [description of what should be done next]
   REQUIRED_BEFORE_TRANSITION: [any requirements before transitioning]
   </PHASE_MARKER>
   ```

2. Use write_file or edit_file to update `memory-bank/activeContext.md` with:
   - What was just completed
   - Current state of the setup process
   - Next steps to be taken

3. Use write_file or edit_file to update `memory-bank/changelog.md` with:
   ```
   ## [YYYY-MM-DD]
   - Created: [file/directory name]
   - Updated: [file/directory name]
   - Reason: [purpose of the change]
   - Details: [relevant information]
   ```

4. After making all file modifications, verify they were applied correctly:
   ```
   read_file("memorybankrules.md")
   read_file("memory-bank/activeContext.md")
   read_file("memory-bank/changelog.md")
   ```

## CHECKPOINTS BEFORE TRANSITION

Before transitioning to Strategy phase, use read_file to verify:
<TRANSITION_CHECKLIST>
[ ] Used write_file to create all required files
[ ] Used edit_file to update code roots in `memorybankrules.md`
[ ] Used write_file or edit_file to create `dependency_tracker.md` with dependencies
[ ] Used write_file or edit_file to create `doc_tracker.md` if needed
[ ] Used write_file or edit_file to update `memorybankrules.md` with NEXT_PHASE: Strategy
</TRANSITION_CHECKLIST>

## REQUIRED RESPONSE FORMAT

All responses after completing an action MUST end with verification of actual file modifications:

<MUP_COMPLETED_ACTIONS>
I have made the following file modifications:

1. EDITED `memorybankrules.md`: [Quote the exact text you added to the file]

2. EDITED `memory-bank/activeContext.md`: [Quote the exact text you added to the file]

3. EDITED `memory-bank/changelog.md`: [Quote the exact text you added to the file or "No significant changes to record"]

4. EDITED ADDITIONAL FILES:
   - [filename]: [Quote the relevant text you added/edited]
   - [filename]: [Quote the relevant text you added/edited]

5. VERIFICATION: I have confirmed all files were properly updated by reading them back.

6. NEXT ACTION: [Describe exactly what will be done next]
</MUP_COMPLETED_ACTIONS>

❗ **IMPORTANT:**
Every response **after completing a significant action** **MUST** include the **full MUP_COMPLETED_ACTIONS block** with actual quotes from the files you modified.
If you forget, **stop immediately** and perform the file edits **before** any further actions.