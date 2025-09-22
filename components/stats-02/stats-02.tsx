import React from "react";

const Stats02Page = () => {
  return (
    <div className="py-16 sm:py-32">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Trusted by developers worldwide
        </h2>
        <p className="mt-4 text-lg max-w-2xl text-muted-foreground">
          Join thousands of users who trust VaultNote for their sensitive communications.
          Built with modern cryptography and designed for maximum privacy.
        </p>

        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold">
              100%
            </span>
            <p className="mt-6 font-medium text-xl">
              Client-side encryption
            </p>
            <p className="mt-2 text-muted-foreground">
              All encryption happens in your browser. Your data never leaves unencrypted.
            </p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold text-muted-foreground">
              0
            </span>
            <p className="mt-6 font-medium text-xl">Data stored on servers</p>
            <p className="mt-2 text-muted-foreground">
              We store only encrypted data. Zero knowledge of your content.
            </p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold">
              🇨🇭
            </span>
            <p className="mt-6 font-medium text-xl">Swiss data protection</p>
            <p className="mt-2 text-muted-foreground">
              Hosted in Switzerland with the world's strongest privacy laws.
            </p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl tracking-tight font-semibold text-muted-foreground">
              ∞
            </span>
            <p className="mt-6 font-medium text-xl">Free forever</p>
            <p className="mt-2 text-muted-foreground">
              No subscription fees. No premium features. Completely free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats02Page;
