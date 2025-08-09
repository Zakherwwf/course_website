"use client";
import React, { useState } from "react";

// Content Components defined in the same file
const MarineContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Protecting Mediterranean marine biodiversity.
        </span>{" "}
        Our marine programme focuses on conserving critical habitats like Posidonia oceanica seagrass meadows,
        establishing marine protected areas, and promoting sustainable fishing practices across North Africa's
        1,445 km of coastline.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            400,000
          </div>
          <div
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Hectares of seagrass meadows
          </div>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            300+
          </div>
          <div
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Fish species in Gulf of Gabès
          </div>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-accent)' }}
          >
            11-17M
          </div>
          <div
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tons of carbon stored
          </div>
        </div>
      </div>
    </div>
  );
};

const FreshwaterContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Securing water for people and nature.
        </span>{" "}
        Our freshwater programme addresses water scarcity through innovative solutions like the Zaghouan Water Fund,
        wetland restoration, and sustainable water management practices in one of the world's most water-stressed regions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Water Crisis Challenge
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tunisia uses 115% of renewable water resources annually
          </p>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Innovation Solution
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            First Payment for Ecosystem Services fund in North Africa
          </p>
        </div>
      </div>
    </div>
  );
};

const LandscapeContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Restoring ecological connectivity across landscapes.
        </span>{" "}
        From Mediterranean forests to Saharan oases, our landscape programme creates corridors for wildlife,
        restores degraded ecosystems, and supports traditional land management practices.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Forest Conservation
          </h4>
          <ul className="text-sm space-y-2" style={{ color: 'var(--color-text-muted)' }}>
            <li>• 970,000 hectares under protection</li>
            <li>• Cork oak restoration projects</li>
            <li>• Climate refugia preservation</li>
          </ul>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Habitat Connectivity
          </h4>
          <ul className="text-sm space-y-2" style={{ color: 'var(--color-text-muted)' }}>
            <li>• Wildlife corridor establishment</li>
            <li>• Wetland network restoration</li>
            <li>• Migration route protection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ClimateContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Building resilience to climate change.
        </span>{" "}
        North Africa is warming 20% faster than the global average. Our climate programme develops adaptation
        strategies, promotes renewable energy, and supports nature-based climate solutions.
      </p>
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: '#ef4444' }}
            >
              +2.2°C
            </div>
            <div
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Expected temperature rise by 2040
            </div>
          </div>
          <div>
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--color-accent)' }}
            >
              -30%
            </div>
            <div
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Summer precipitation decrease by 2080
            </div>
          </div>
          <div>
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Carbon
            </div>
            <div
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Sequestration through restoration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Enabling effective conservation policies.
        </span>{" "}
        Our policy programme works with governments, institutions, and communities to develop and implement
        evidence-based conservation policies that protect biodiversity while supporting sustainable development.
      </p>
      <div className="space-y-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Policy Integration
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Ensuring conservation is mainstreamed across agriculture, water, energy, and tourism sectors
          </p>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Legal Frameworks
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Supporting new biodiversity legislation and ecosystem-based management approaches
          </p>
        </div>
      </div>
    </div>
  );
};

const WildlifeContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Protecting iconic and endemic species.
        </span>{" "}
        Our wildlife programme safeguards North Africa's unique fauna, from migratory birds using the
        Mediterranean flyway to endemic species in mountain refugia and desert ecosystems.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Migration Corridors
          </h4>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            2 billion birds annually use North Africa as a critical stopover during migration between Europe and sub-Saharan Africa.
          </p>
          <div className="flex gap-2 text-xs">
            <span
              className="px-2 py-1 rounded"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
            >
              Waterbirds
            </span>
            <span
              className="px-2 py-1 rounded"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white'
              }}
            >
              Raptors
            </span>
          </div>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Endemic Species
          </h4>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Over 400 plant species (30% of Tunisia's flora) found in climate refugia like Djebel Zaghouan.
          </p>
          <div className="flex gap-2 text-xs">
            <span
              className="px-2 py-1 rounded"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
            >
              Mountain Flora
            </span>
            <span
              className="px-2 py-1 rounded"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white'
              }}
            >
              Desert Fauna
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SustainableFinanceContent = () => {
  return (
    <div
      className="p-8 md:p-12 rounded-lg mb-6 border"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <p
        className="text-base md:text-xl leading-relaxed max-w-4xl mx-auto mb-8"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)'
        }}
      >
        <span
          className="font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          Innovative financing for conservation.
        </span>{" "}
        Tunisia faces a $100 million annual conservation funding gap. Our sustainable finance programme
        develops innovative mechanisms like green bonds, carbon markets, and payment for ecosystem services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Current Investment
          </h4>
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            $50M
          </div>
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Annual conservation spending
          </p>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <h4
            className="font-bold text-lg mb-3"
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Required Investment
          </h4>
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: '#ef4444' }}
          >
            $150M
          </div>
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Estimated annual conservation need
          </p>
        </div>
      </div>
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h4
          className="font-bold text-lg mb-4"
          style={{
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-sans)'
          }}
        >
          Innovative Solutions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div
              className="font-bold mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Green Bonds
            </div>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Tunisia's first issued 2022
            </p>
          </div>
          <div>
            <div
              className="font-bold mb-2"
              style={{ color: 'var(--color-accent)' }}
            >
              Carbon Markets
            </div>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Blue carbon potential
            </p>
          </div>
          <div>
            <div
              className="font-bold mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Debt Swaps
            </div>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Debt-for-nature with Italy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Programme data
const programmeData = [
  {
    category: "Marine Conservation",
    title: "Protecting Mediterranean marine biodiversity",
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=3000&auto=format&fit=crop",
    content: <MarineContent />,
  },
  {
    category: "Freshwater",
    title: "Securing water for people and nature",
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=3000&auto=format&fit=crop",
    content: <FreshwaterContent />,
  },
  {
    category: "Landscape",
    title: "Restoring ecological connectivity",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=3000&auto=format&fit=crop",
    content: <LandscapeContent />,
  },
  {
    category: "Climate",
    title: "Building resilience to climate change",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=3000&auto=format&fit=crop",
    content: <ClimateContent />,
  },
  {
    category: "Policy",
    title: "Enabling effective conservation policies",
    src: "https://images.unsplash.com/photo-1555992457-46c773636c9e?q=80&w=3000&auto=format&fit=crop",
    content: <PolicyContent />,
  },
  {
    category: "Wildlife",
    title: "Protecting iconic and endemic species",
    src: "https://images.unsplash.com/photo-1549366021-9f761d040a94?q=80&w=3000&auto=format&fit=crop",
    content: <WildlifeContent />,
  },
  {
    category: "Sustainable Finance",
    title: "Innovative financing for conservation",
    src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=3000&auto=format&fit=crop",
    content: <SustainableFinanceContent />,
  },
];

export default function WWFProgrammesCarousel() {
  const [selectedProgramme, setSelectedProgramme] = useState(0);

  return (
    <div className="w-full py-16" style={{ fontFamily: 'var(--font-sans)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-primary)',
            letterSpacing: '-0.02em'
          }}
        >
          Our Seven Conservation Programmes
        </h2>

        {/* Programme Navigation - Styled like your existing components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {programmeData.map((programme, index) => (
            <button
              key={index}
              onClick={() => setSelectedProgramme(index)}
              className="p-6 rounded-lg text-left transition-all duration-200 border"
              style={{
                backgroundColor: selectedProgramme === index ? 'var(--color-primary)' : 'var(--color-bg)',
                borderColor: selectedProgramme === index ? 'var(--color-primary)' : 'var(--color-border)',
                color: selectedProgramme === index ? 'white' : 'var(--color-text)',
                transform: selectedProgramme === index ? 'translateY(-2px)' : 'none',
                boxShadow: selectedProgramme === index ? '0 4px 12px rgba(0, 76, 118, 0.2)' : 'none'
              }}
            >
              <div
                className="text-sm font-medium mb-2"
                style={{
                  opacity: selectedProgramme === index ? 0.9 : 0.7,
                  color: selectedProgramme === index ? 'white' : 'var(--color-accent)'
                }}
              >
                {programme.category}
              </div>
              <div className="font-bold text-lg leading-tight">
                {programme.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Programme Content */}
        <div className="mb-12">
          <div
            className="relative rounded-lg overflow-hidden mb-8 border"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <img
              src={programmeData[selectedProgramme].src}
              alt={programmeData[selectedProgramme].title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <div className="p-8 text-white">
                <div
                  className="text-sm font-medium mb-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {programmeData[selectedProgramme].category}
                </div>
                <h3
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {programmeData[selectedProgramme].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Programme Content */}
          <div className="prose-content">
            {programmeData[selectedProgramme].content}
          </div>
        </div>

        <div
          className="text-center p-8 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-bg-alt)',
            borderColor: 'var(--color-border)'
          }}
        >
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Through these integrated programmes, WWF North Africa works to build a future where people
            and nature thrive together across the diverse ecosystems of the Mediterranean and Saharan regions.
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .prose-content h4 {
          font-family: var(--font-sans);
          font-size: 1.25rem;
          margin: 0 0 0.5rem 0;
          color: var(--color-primary);
          font-weight: 700;
        }
        
        .prose-content p {
          font-family: var(--font-sans);
          line-height: 1.7;
          margin-bottom: 1.25em;
        }
        
        .prose-content ul {
          list-style-type: none;
          padding-left: 0;
        }
        
        .prose-content li {
          margin-bottom: 0.5em;
          padding-left: 1rem;
          position: relative;
        }
        
        .prose-content li:before {
          content: '•';
          color: var(--color-primary);
          font-weight: bold;
          position: absolute;
          left: 0;
        }
      `}</style>
    </div>
  );
}