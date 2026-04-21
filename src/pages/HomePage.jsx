import { gitHooks } from "../data/gitHooks";

function HomePage() {
  return (
    <>
      <section>
        <h2>What are Git Hooks?</h2>
        <p>
          Git hooks are scripts that Git executes before or after events such
          as:
          <code>commit</code>, <code>push</code>, and <code>receive</code>. They
          are a built-in feature of Git that allows you to trigger customisable
          actions at key points in the development life cycle.
        </p>
      </section>

      <section>
        <h2>Git Hooks Directory</h2>
        <div className="hooks-list">
          {gitHooks.map((hook) => (
            <div key={hook.name} className="hook-card">
              <h3>
                <code>{hook.name}</code>
              </h3>
              <p>{hook.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
