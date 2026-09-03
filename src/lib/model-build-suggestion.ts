import type { BodyBuildId } from "@/types/onboarding";
import type { LengthMeasurement, UserMeasurements, WeightMeasurement } from "@/types/profile";

function toCentimeters(measurement?: LengthMeasurement): number | undefined {
  if (!measurement) {
    return undefined;
  }

  if (measurement.unit === "cm") {
    return Number.isFinite(measurement.value) && measurement.value > 0
      ? measurement.value
      : undefined;
  }

  const totalInches = measurement.feet * 12 + measurement.inches;

  return Number.isFinite(totalInches) && totalInches > 0 ? totalInches * 2.54 : undefined;
}

function toKilograms(measurement?: WeightMeasurement): number | undefined {
  if (!measurement || !Number.isFinite(measurement.value) || measurement.value <= 0) {
    return undefined;
  }

  return measurement.unit === "kg" ? measurement.value : measurement.value * 0.45359237;
}

/**
 * Gives the manual build selector a neutral, editable starting position.
 * Athletic is deliberately never inferred because height and weight do not describe body composition.
 */
export function suggestBuildFromMeasurements(
  measurements: Pick<UserMeasurements, "height" | "weight">,
): BodyBuildId | undefined {
  const heightCm = toCentimeters(measurements.height);
  const weightKg = toKilograms(measurements.weight);

  if (!heightCm || !weightKg) {
    return undefined;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return "slim";
  }

  if (bmi < 21.5) {
    return "lean";
  }

  if (bmi < 27.5) {
    return "average";
  }

  return "full";
}
