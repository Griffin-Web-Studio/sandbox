import type { supportedLanguages } from "@/components/ui/Editor";

export class CodeSampleGenerator {
  protected language: supportedLanguages | undefined;

  constructor(language: supportedLanguages) {
    this.language = language;
  }

  static generateLanguageSample = async (language: supportedLanguages) => {
    const codeSampleGenerator = new CodeSampleGenerator(language);

    return await codeSampleGenerator.fetchSample(`./sample/sample.${language}`);
  };

  public generateSample = async () => {
    return await this.fetchSample(`./sample/sample.${this.language}`);
  };

  protected fetchSample = async (url: string) =>
    await fetch(url)
      .then((response) => response.text())
      .then((text) => {
        return text;
      });
}
