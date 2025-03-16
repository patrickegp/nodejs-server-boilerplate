import fs from "fs";
import path from "path";
import handlebars from "handlebars"; 

const templatesDir = path.join(__dirname, "templates");

export const loadTemplate = (templateName: string, variables: Record<string, any>): string => {
  const filePath = path.join(templatesDir, `${templateName}.hbs`);

  const templateContent = fs.readFileSync(filePath, "utf8");
  const compiledTemplate = handlebars.compile(templateContent);

  return compiledTemplate(variables);
};
