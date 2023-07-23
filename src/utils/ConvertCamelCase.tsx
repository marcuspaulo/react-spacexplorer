// Função para converter chaves com underscore para camelCase
function convertKeysToCamelCase(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }

  const camelCaseObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, group1) => group1.toUpperCase());
      camelCaseObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
    }
  }

  return camelCaseObj;
}
