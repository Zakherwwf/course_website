  import React from "react";

export const MarineContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Protecting Mediterranean marine biodiversity.
        </span>{" "}
        Our marine programme focuses on conserving critical habitats like Posidonia oceanica seagrass meadows,
        establishing marine protected areas, and promoting sustainable fishing practices across North Africa's
        1,445 km of coastline.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">400,000</div>
          <div className="text-sm text-neutral-600">Hectares of seagrass meadows</div>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">300+</div>
          <div className="text-sm text-neutral-600">Fish species in Gulf of Gabès</div>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">11-17M</div>
          <div className="text-sm text-neutral-600">Tons of carbon stored</div>
        </div>
      </div>
    </div>
  );
};

export const FreshwaterContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Securing water for people and nature.
        </span>{" "}
        Our freshwater programme addresses water scarcity through innovative solutions like the Zaghouan Water Fund,
        wetland restoration, and sustainable water management practices in one of the world's most water-stressed regions.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-2">Water Crisis Challenge</h4>
          <p className="text-neutral-600 text-sm">Tunisia uses 115% of renewable water resources annually</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-2">Innovation Solution</h4>
          <p className="text-neutral-600 text-sm">First Payment for Ecosystem Services fund in North Africa</p>
        </div>
      </div>
    </div>
  );
};

export const LandscapeContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Restoring ecological connectivity across landscapes.
        </span>{" "}
        From Mediterranean forests to Saharan oases, our landscape programme creates corridors for wildlife,
        restores degraded ecosystems, and supports traditional land management practices.
      </p>
      <div className="mt-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-3">Forest Conservation</h4>
          <ul className="text-neutral-600 text-sm space-y-1">
            <li>• 970,000 hectares under protection</li>
            <li>• Cork oak restoration projects</li>
            <li>• Climate refugia preservation</li>
          </ul>
        </div>
        <div className="flex-1 bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-3">Habitat Connectivity</h4>
          <ul className="text-neutral-600 text-sm space-y-1">
            <li>• Wildlife corridor establishment</li>
            <li>• Wetland network restoration</li>
            <li>• Migration route protection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ClimateContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Building resilience to climate change.
        </span>{" "}
        North Africa is warming 20% faster than the global average. Our climate programme develops adaptation
        strategies, promotes renewable energy, and supports nature-based climate solutions.
      </p>
      <div className="mt-8 bg-white dark:bg-neutral-700 p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-red-500 mb-2">+2.2°C</div>
            <div className="text-sm text-neutral-600">Expected temperature rise by 2040</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">-30%</div>
            <div className="text-sm text-neutral-600">Summer precipitation decrease by 2080</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-500 mb-2">Carbon</div>
            <div className="text-sm text-neutral-600">Sequestration through restoration</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PolicyContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Enabling effective conservation policies.
        </span>{" "}
        Our policy programme works with governments, institutions, and communities to develop and implement
        evidence-based conservation policies that protect biodiversity while supporting sustainable development.
      </p>
      <div className="mt-8 space-y-4">
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-2">Policy Integration</h4>
          <p className="text-neutral-600 text-sm">Ensuring conservation is mainstreamed across agriculture, water, energy, and tourism sectors</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-2">Legal Frameworks</h4>
          <p className="text-neutral-600 text-sm">Supporting new biodiversity legislation and ecosystem-based management approaches</p>
        </div>
      </div>
    </div>
  );
};

export const WildlifeContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Protecting iconic and endemic species.
        </span>{" "}
        Our wildlife programme safeguards North Africa's unique fauna, from migratory birds using the
        Mediterranean flyway to endemic species in mountain refugia and desert ecosystems.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-3">Migration Corridors</h4>
          <p className="text-neutral-600 text-sm mb-4">
            2 billion birds annually use North Africa as a critical stopover during migration between Europe and sub-Saharan Africa.
          </p>
          <div className="flex gap-2 text-xs">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Waterbirds</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Raptors</span>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-3">Endemic Species</h4>
          <p className="text-neutral-600 text-sm mb-4">
            Over 400 plant species (30% of Tunisia's flora) found in climate refugia like Djebel Zaghouan.
          </p>
          <div className="flex gap-2 text-xs">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Mountain Flora</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Desert Fauna</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SustainableFinanceContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Innovative financing for conservation.
        </span>{" "}
        Tunisia faces a $100 million annual conservation funding gap. Our sustainable finance programme
        develops innovative mechanisms like green bonds, carbon markets, and payment for ecosystem services.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-3">Current Investment</h4>
          <div className="text-2xl font-bold text-green-600 mb-2">$50M</div>
          <p className="text-neutral-600 text-sm">Annual conservation spending</p>
        </div>
        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-3">Required Investment</h4>
          <div className="text-2xl font-bold text-red-600 mb-2">$150M</div>
          <p className="text-neutral-600 text-sm">Estimated annual conservation need</p>
        </div>
      </div>
      <div className="mt-6 bg-white dark:bg-neutral-700 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3">Innovative Solutions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-semibold text-blue-600">Green Bonds</div>
            <p className="text-xs text-neutral-600 mt-1">Tunisia's first issued 2022</p>
          </div>
          <div>
            <div className="font-semibold text-green-600">Carbon Markets</div>
            <p className="text-xs text-neutral-600 mt-1">Blue carbon potential</p>
          </div>
          <div>
            <div className="font-semibold text-purple-600">Debt Swaps</div>
            <p className="text-xs text-neutral-600 mt-1">Debt-for-nature with Italy</p>
          </div>
        </div>
      </div>
    </div>
  );
};