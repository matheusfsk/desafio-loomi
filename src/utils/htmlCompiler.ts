import fs from "fs/promises";
import handlebars from "handlebars";

const htmlCompiler = async (file: string, context: any) => {
  const html = await fs.readFile(file);
  const compiler = handlebars.compile(html.toString());
  return compiler(context);
};

export default htmlCompiler;
