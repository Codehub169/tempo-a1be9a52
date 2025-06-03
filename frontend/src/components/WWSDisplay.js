import React from 'react';

export default function WWSDisplay({ points, maxRent, listedPrice }) {
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return 'N/A';
    return value.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
  };

  const pointsDisplay = (points === null || points === undefined || isNaN(points)) ? 'N/A' : `${Math.round(points)} points`;

  return (
    <div className="bg-neutral-light-gray p-6 rounded-card shadow-sm border border-neutral-border-gray my-6">
      <h3 className="text-xl font-semibold font-secondary text-brand-primary mb-4">
        Woningwaarderingsstelsel (WWS) Insight
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-neutral-text-gray">Calculated WWS Points:</span>
          <strong className="text-neutral-very-dark-gray text-lg">{pointsDisplay}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-text-gray">Max. Legal Rent (WWS):</span>
          <strong className="text-neutral-very-dark-gray text-lg">{formatCurrency(maxRent)}</strong>
        </div>
        {typeof listedPrice === 'number' && !isNaN(listedPrice) && (
          <div className="flex justify-between items-center">
            <span className="text-neutral-text-gray">Advertised Rent:</span>
            <strong className="text-neutral-very-dark-gray text-lg">{formatCurrency(listedPrice)}</strong>
          </div>
        )}
      </div>
      {typeof listedPrice === 'number' && !isNaN(listedPrice) && 
       typeof maxRent === 'number' && !isNaN(maxRent) && 
       points !== null && points !== undefined && !isNaN(points) && (
        <div className="mt-4 pt-4 border-t border-neutral-border-gray">
          {listedPrice > maxRent ? (
            <p className="text-status-error font-semibold">
              Note: The advertised rent is {formatCurrency(listedPrice - maxRent)} higher than the maximum legal rent based on WWS points.
            </p>
          ) : listedPrice < maxRent ? (
            <p className="text-status-success font-semibold">
              The advertised rent is {formatCurrency(maxRent - listedPrice)} lower than the maximum legal rent based on WWS points.
            </p>
          ) : (
            <p className="text-status-success font-semibold">
              The advertised rent matches the maximum legal rent based on WWS points.
            </p>
          )}
        </div>
      )}
      <p className="text-xs text-neutral-text-gray mt-5">
        <strong>Disclaimer:</strong> This WWS calculation is an estimate for informational purposes and may not reflect the official valuation. Always consult official resources for precise calculations and legal advice.
      </p>
    </div>
  );
}
