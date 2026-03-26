export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#00205B] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">Thank you for your order</h1>
        <p className="text-lg mb-8">
          Your payment was successful. We’ve received your order and will be in touch soon.
        </p>
        <a
          href="/"
          className="inline-block rounded-full bg-[#00205B] px-6 py-3 text-white font-semibold transition hover:opacity-90"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}