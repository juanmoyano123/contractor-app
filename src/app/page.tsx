export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Contractor Referral Network
        </h1>
        <p className="text-center text-lg text-gray-600">
          Multi-tenant white-label platform for trade associations
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Share Overflow</h2>
            <p className="text-gray-600">Turn your overflow leads into referral revenue</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Track Everything</h2>
            <p className="text-gray-600">Automated commission tracking and status updates</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Network Reciprocity</h2>
            <p className="text-gray-600">Build trust with balanced referral relationships</p>
          </div>
        </div>
      </div>
    </main>
  )
}
