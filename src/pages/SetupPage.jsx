import "./SetupPage.css";

function SetupPage() {
  return (
    <section>
      <h2>Setting Up a Local Pre-Commit Hook</h2>
      <p className="intro">
        You don't need any external tools to use Git hooks! Git has a built-in
        mechanism that lets you run your own scripts at different points. This
        guide shows you how to set up a basic, language-agnostic pre-commit hook
        directly in your local repository.
      </p>

      <div className="step">
        <h3>Step 1: Find Your Hooks Directory</h3>
        <p>
          Every Git repository you initialise has a hidden <code>.git</code>{" "}
          directory. Inside that, you'll find a <code>hooks</code> folder which
          contains some sample hook files.
        </p>
        <p>Navigate into this directory from the root of your project:</p>
        <pre>
          <code>cd .git/hooks</code>
        </pre>
      </div>

      <div className="step">
        <h3>Step 2: Create the Hook File</h3>
        <p>
          To activate a hook, you need to create a file inside the{" "}
          <code>.git/hooks</code> directory with the correct name (without any
          extension). For a pre-commit hook, the file must be named{" "}
          <code>pre-commit</code>.
        </p>
        <p>You can create a new, empty file like this:</p>
        <pre>
          <code>touch pre-commit</code>
        </pre>
      </div>

      <div className="step">
        <h3>Step 3: Write Your Script</h3>
        <p>
          Open the <code>pre-commit</code> file in your favourite text editor.
          The first line must be a "shebang" to tell the system how to execute
          the script. For a simple shell script, use <code>#!/bin/sh</code>.
        </p>
        <p>
          The script needs to exit with a status of <code>0</code> for the
          commit to proceed. If it exits with any other status (like{" "}
          <code>1</code>), the commit will be aborted.
        </p>
        <p>
          Here is a simple example script that prevents commits if the word
          "TODO" is found in any of the files you're about to commit:
        </p>
        <pre>
          <code>
            #!/bin/sh{"\n"}
            {"\n"}# Redirect output to stderr.
            {"\n"}exec &gt;&2{"\n"}
            {"\n"}# Check for "TODO" in staged files
            {"\n"}if git diff --cached | grep -q 'TODO'; then
            {"\n"} echo "Error: Found 'TODO' in staged changes. Please remove it
            before committing."
            {"\n"} exit 1{"\n"}fi
            {"\n"}
            {"\n"}exit 0
          </code>
        </pre>
      </div>

      <div className="step">
        <h3>Step 4: Make the Hook Executable</h3>
        <p>
          This is a critical step! By default, your new file won't have
          permission to be executed. You need to grant it execute permissions.
        </p>
        <pre>
          <code>chmod +x pre-commit</code>
        </pre>
      </div>

      <div className="step">
        <h3>Step 5: Try It Out!</h3>
        <p>
          That's it! Now, add a file to your staging area that contains the word
          "TODO" and try to commit it. Git will run your script, find the word,
          print your error message, and block the commit. If you remove the word
          and try again, the commit will succeed.
        </p>
      </div>

      <div className="important-note">
        <h4>An Important Note on Sharing</h4>
        <p>
          The <code>.git/hooks</code> directory is not tracked by Git and is not
          pushed to your remote repository. This means these hooks are for your
          local machine only. This is why tools like Husky are popular for
          teams, as they allow you to commit hook configurations and share them
          with everyone on the project.
        </p>
      </div>
    </section>
  );
}

export default SetupPage;
