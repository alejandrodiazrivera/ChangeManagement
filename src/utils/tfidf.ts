export class TFIDF {
  private vocab: string[] = [];
  private idf: Record<string, number> = {};
  private themeVectors: Record<string, Record<string, number>> = {};

  fit(statements: { text: string }[], themes: string[]) {
    const docFreq: Record<string, number> = {};
    const allWords = new Set<string>();
    statements.forEach(s => {
      const words = this.tokenize(s.text);
      const unique = new Set(words);
      unique.forEach(w => {
        allWords.add(w);
        docFreq[w] = (docFreq[w] || 0) + 1;
      });
    });
    this.vocab = Array.from(allWords);
    const N = statements.length;
    this.vocab.forEach(w => {
      this.idf[w] = Math.log((N + 1) / ((docFreq[w] || 1) + 1)) + 1;
    });

    const themeKeywords: Record<string, string[]> = {
      'Lack of Awareness': ['awareness', 'understand', 'communication', 'inconsistent', 'confused', 'why', 'change'],
      'Fear & Trust Issues': ['trust', 'risk', 'redundant', 'worried', 'concerned', 'afraid', 'convinced', 'role'],
      'Process Complexity': ['complicated', 'training', 'tools', 'software', 'features', 'process', 'workflow', 'complex'],
      'Operational Concerns': ['timeline', 'pressure', 'owner', 'consulted', 'support', 'SLA', 'deadline', 'operational'],
      'General Issues': ['general', 'issue', 'problem', 'feedback', 'suggestion'],
    };

    Object.keys(themeKeywords).forEach(t => {
      const vec: Record<string, number> = {};
      this.vocab.forEach(w => { vec[w] = 0; });
      themeKeywords[t].forEach(kw => {
        this.vocab.forEach(w => {
          if (w.includes(kw) || kw.includes(w)) vec[w] += 1;
        });
      });
      this.themeVectors[t] = vec;
    });
  }

  tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 2);
  }

  transform(text: string): Record<string, number> {
    const tokens = this.tokenize(text);
    const vec: Record<string, number> = {};
    this.vocab.forEach(w => { vec[w] = 0; });
    tokens.forEach(t => {
      if (vec.hasOwnProperty(t)) vec[t] = (vec[t] || 0) + 1;
    });
    this.vocab.forEach(w => {
      vec[w] = (vec[w] || 0) * (this.idf[w] || 1);
    });
    return vec;
  }

  cosineSimilarity(vecA: Record<string, number>, vecB: Record<string, number>): number {
    let dot = 0, magA = 0, magB = 0;
    this.vocab.forEach(w => {
      const a = vecA[w] || 0;
      const b = vecB[w] || 0;
      dot += a * b;
      magA += a * a;
      magB += b * b;
    });
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }

  predict(text: string): [string, number][] {
    const vec = this.transform(text);
    const scores: Record<string, number> = {};
    Object.keys(this.themeVectors).forEach(theme => {
      scores[theme] = this.cosineSimilarity(vec, this.themeVectors[theme]);
    });
    const max = Math.max(...Object.values(scores), 0.01);
    const normalized: Record<string, number> = {};
    Object.keys(scores).forEach(k => {
      normalized[k] = Math.round((scores[k] / max) * 100) / 100;
    });
    return Object.entries(normalized).sort((a, b) => b[1] - a[1]);
  }
}