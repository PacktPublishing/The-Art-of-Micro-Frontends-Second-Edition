const modulesData = {};

exports.getModules = () => {
  const allModules = [];

  Object.keys(modulesData).forEach((name) =>
    Object.keys(modulesData[name]).forEach((version) => {
      allModules.push(modulesData[name][version]);
    })
  );

  return allModules;
};

exports.getModuleData = (name, version) => {
  const versions = modulesData[name] || {};
  return versions[version];
};

exports.setModuleData = (moduleData) => {
  const meta = moduleData.meta;
  const current = modulesData[meta.name] || {};
  modulesData[meta.name] = {
    ...current,
    [meta.version]: moduleData,
  };
};
