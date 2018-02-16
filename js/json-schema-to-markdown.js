const R = require('ramda')

const formatPropDefinition = ([propName, propDef]) =>
  `|**${propName}**|${propDef.type}|${R.propOr('', 'description', propDef)}| |
`
const addTableHeader = str =>
  `|   |Type|Description|Required|
|---|----|-----------|--------|
${str}`

const formatProperties = R.pipe(
  R.prop('properties'),
  R.toPairs,
  R.reduce((md, pair) => md + formatPropDefinition(pair), ''),
  R.ifElse(R.isEmpty, R.empty, addTableHeader)
)

const formatTypeDefinition = ([typeName, typeDef]) => `# ${typeName}
${R.propOr('*no description yet*', 'description', typeDef)}
  
\`${typeName}\` type: \`${typeDef.type}\`
${formatProperties(typeDef)}`

const addTypeHeader = str => `The schema defines the following types:\n\n${str}`
const formatDefinitions = R.pipe(
  R.prop('definitions'),
  R.toPairs,
  R.reduce((md, pair) => md + formatTypeDefinition(pair), ''),
  R.ifElse(R.isEmpty, R.empty, addTypeHeader)
)

const jsonSchemaToMarkdown = formatDefinitions

module.exports = jsonSchemaToMarkdown
