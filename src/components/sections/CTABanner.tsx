import Link from 'next/link';

const CTABanner = () => {
  return (
    <section className="bg-amber-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to satisfy your sweet tooth?
          </h2>
          <p className="mt-4 text-xl text-amber-100">
            Browse our full menu and place your order today. Fresh cookies delivered to your door!
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/menu"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-amber-600 shadow-sm hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Order Now
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-white hover:text-amber-100 transition-colors"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;