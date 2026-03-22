function App() {
  return (
    <main>
      {/* Noise overlay for atmospheric grain effect */}
      <div className="noise-overlay" />

      {/* Components will be added in subsequent steps */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-syne text-4xl font-bold text-text-primary mb-4">
            Neural Terminal
          </h1>
          <p className="font-mono text-text-secondary text-glow">
            &gt; system initialized. all modules standing by._
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
