export function fetchFrameworkData() {
  const experimentsPromise = Promise.resolve({ 'specs.AnExperiment': 'true' });
  return { experimentsPromise };
}
