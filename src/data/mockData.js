export const currentUser = {
  id: 'u1',
  username: 'codebook-user',
  name: 'Alex Developer',
  email: 'alex@codebook.dev',
  avatar: null,
  bio: 'Full-stack developer passionate about open source and AI-powered tools.',
  location: 'San Francisco, CA',
  company: 'CodeBook Inc.',
  website: 'https://codebook.dev',
  joinedDate: '2024-03-15',
  followers: 1247,
  following: 89,
  stars: 342,
  repositories: 47,
  storage: { used: 2.4, total: Infinity, unit: 'GB' },
};

export const repositories = [
  {
    id: 'r1',
    name: 'react',
    owner: 'facebook',
    fullName: 'facebook/react',
    description: 'The library for web and native user interfaces.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 231400,
    forks: 47200,
    issues: 892,
    pullRequests: 234,
    watchers: 6700,
    license: 'MIT',
    updatedAt: '2026-02-16',
    createdAt: '2013-05-24',
    isPrivate: false,
    topics: ['javascript', 'react', 'ui', 'frontend', 'library'],
    defaultBranch: 'main',
    size: '187 MB',
    hasWiki: true,
    hasIssues: true,
    contributors: 1680,
  },
  {
    id: 'r2',
    name: 'next.js',
    owner: 'vercel',
    fullName: 'vercel/next.js',
    description: 'The React Framework for the Web.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 128900,
    forks: 27400,
    issues: 2341,
    pullRequests: 456,
    watchers: 1200,
    license: 'MIT',
    updatedAt: '2026-02-16',
    createdAt: '2016-10-25',
    isPrivate: false,
    topics: ['nextjs', 'react', 'typescript', 'framework', 'ssr'],
    defaultBranch: 'canary',
    size: '412 MB',
    hasWiki: true,
    hasIssues: true,
    contributors: 3200,
  },
  {
    id: 'r3',
    name: 'tensorflow',
    owner: 'tensorflow',
    fullName: 'tensorflow/tensorflow',
    description: 'An Open Source Machine Learning Framework for Everyone.',
    language: 'C++',
    languageColor: '#f34b7d',
    stars: 186000,
    forks: 74100,
    issues: 1823,
    pullRequests: 189,
    watchers: 7800,
    license: 'Apache-2.0',
    updatedAt: '2026-02-15',
    createdAt: '2015-11-07',
    isPrivate: false,
    topics: ['machine-learning', 'deep-learning', 'neural-network', 'python', 'ai'],
    defaultBranch: 'master',
    size: '562 MB',
    hasWiki: true,
    hasIssues: true,
    contributors: 3450,
  },
  {
    id: 'r4',
    name: 'codebook-core',
    owner: 'codebook-user',
    fullName: 'codebook-user/codebook-core',
    description: 'Core engine for CodeBook AI-powered code documentation platform.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 4520,
    forks: 312,
    issues: 45,
    pullRequests: 12,
    watchers: 234,
    license: 'MIT',
    updatedAt: '2026-02-16',
    createdAt: '2025-06-01',
    isPrivate: false,
    topics: ['codebook', 'documentation', 'ai', 'code-understanding'],
    defaultBranch: 'main',
    size: '34 MB',
    hasWiki: true,
    hasIssues: true,
    contributors: 28,
  },
  {
    id: 'r5',
    name: 'awesome-codebook',
    owner: 'codebook-user',
    fullName: 'codebook-user/awesome-codebook',
    description: 'A curated list of CodeBook plugins, themes, and resources.',
    language: 'Markdown',
    languageColor: '#083fa1',
    stars: 1280,
    forks: 156,
    issues: 8,
    pullRequests: 3,
    watchers: 89,
    license: 'CC0-1.0',
    updatedAt: '2026-02-14',
    createdAt: '2025-08-12',
    isPrivate: false,
    topics: ['awesome', 'codebook', 'resources', 'plugins'],
    defaultBranch: 'main',
    size: '2 MB',
    hasWiki: false,
    hasIssues: true,
    contributors: 67,
  },
  {
    id: 'r6',
    name: 'api-gateway',
    owner: 'codebook-user',
    fullName: 'codebook-user/api-gateway',
    description: 'High-performance API gateway with rate limiting and caching.',
    language: 'Go',
    languageColor: '#00ADD8',
    stars: 892,
    forks: 78,
    issues: 12,
    pullRequests: 5,
    watchers: 45,
    license: 'MIT',
    updatedAt: '2026-02-13',
    createdAt: '2025-09-20',
    isPrivate: false,
    topics: ['go', 'api', 'gateway', 'microservices'],
    defaultBranch: 'main',
    size: '8 MB',
    hasWiki: true,
    hasIssues: true,
    contributors: 12,
  },
];

export const fileTree = [
  { type: 'dir', name: 'src', path: 'src', children: [
    { type: 'dir', name: 'components', path: 'src/components', children: [
      { type: 'file', name: 'App.tsx', path: 'src/components/App.tsx', size: '2.4 KB', lang: 'TypeScript' },
      { type: 'file', name: 'Header.tsx', path: 'src/components/Header.tsx', size: '1.8 KB', lang: 'TypeScript' },
      { type: 'file', name: 'Sidebar.tsx', path: 'src/components/Sidebar.tsx', size: '3.1 KB', lang: 'TypeScript' },
      { type: 'file', name: 'CodeViewer.tsx', path: 'src/components/CodeViewer.tsx', size: '4.2 KB', lang: 'TypeScript' },
      { type: 'file', name: 'ChatPanel.tsx', path: 'src/components/ChatPanel.tsx', size: '2.9 KB', lang: 'TypeScript' },
    ]},
    { type: 'dir', name: 'hooks', path: 'src/hooks', children: [
      { type: 'file', name: 'useAuth.ts', path: 'src/hooks/useAuth.ts', size: '1.2 KB', lang: 'TypeScript' },
      { type: 'file', name: 'useRepo.ts', path: 'src/hooks/useRepo.ts', size: '890 B', lang: 'TypeScript' },
    ]},
    { type: 'dir', name: 'utils', path: 'src/utils', children: [
      { type: 'file', name: 'parser.ts', path: 'src/utils/parser.ts', size: '5.6 KB', lang: 'TypeScript' },
      { type: 'file', name: 'graph.ts', path: 'src/utils/graph.ts', size: '3.4 KB', lang: 'TypeScript' },
      { type: 'file', name: 'helpers.ts', path: 'src/utils/helpers.ts', size: '1.1 KB', lang: 'TypeScript' },
    ]},
    { type: 'file', name: 'index.tsx', path: 'src/index.tsx', size: '420 B', lang: 'TypeScript' },
    { type: 'file', name: 'types.ts', path: 'src/types.ts', size: '2.1 KB', lang: 'TypeScript' },
  ]},
  { type: 'dir', name: 'tests', path: 'tests', children: [
    { type: 'file', name: 'parser.test.ts', path: 'tests/parser.test.ts', size: '3.2 KB', lang: 'TypeScript' },
    { type: 'file', name: 'graph.test.ts', path: 'tests/graph.test.ts', size: '2.8 KB', lang: 'TypeScript' },
  ]},
  { type: 'dir', name: 'docs', path: 'docs', children: [
    { type: 'file', name: 'architecture.md', path: 'docs/architecture.md', size: '4.5 KB', lang: 'Markdown' },
    { type: 'file', name: 'api-reference.md', path: 'docs/api-reference.md', size: '8.2 KB', lang: 'Markdown' },
  ]},
  { type: 'file', name: 'package.json', path: 'package.json', size: '1.2 KB', lang: 'JSON' },
  { type: 'file', name: 'tsconfig.json', path: 'tsconfig.json', size: '680 B', lang: 'JSON' },
  { type: 'file', name: 'README.md', path: 'README.md', size: '3.8 KB', lang: 'Markdown' },
  { type: 'file', name: '.gitignore', path: '.gitignore', size: '240 B', lang: 'Text' },
];

export const sampleCode = `import { useState, useEffect, useCallback } from 'react';
import { parseAST, buildGraph } from './utils/parser';
import { KnowledgeGraph } from './utils/graph';
import type { RepoConfig, WikiPage, ParseResult } from './types';

/**
 * Core engine for generating wiki documentation from source code.
 * Uses AST parsing and knowledge graph construction to create
 * interconnected documentation pages.
 */
export class WikiEngine {
  private graph: KnowledgeGraph;
  private config: RepoConfig;
  private cache: Map<string, ParseResult>;

  constructor(config: RepoConfig) {
    this.config = config;
    this.graph = new KnowledgeGraph();
    this.cache = new Map();
  }

  /**
   * Parse all source files in the repository and build
   * the knowledge graph for documentation generation.
   */
  async initialize(): Promise<void> {
    const files = await this.scanRepository();

    for (const file of files) {
      const ast = await parseAST(file.path, file.content);
      const symbols = this.extractSymbols(ast);

      symbols.forEach(symbol => {
        this.graph.addNode(symbol);
      });

      this.cache.set(file.path, { ast, symbols });
    }

    this.graph.buildEdges();
    console.log(\`Initialized wiki with \${this.graph.nodeCount} symbols\`);
  }

  /**
   * Generate a wiki page for the specified symbol or module.
   */
  async generatePage(symbolId: string): Promise<WikiPage> {
    const node = this.graph.getNode(symbolId);
    if (!node) throw new Error(\`Symbol not found: \${symbolId}\`);

    const references = this.graph.getReferences(symbolId);
    const dependencies = this.graph.getDependencies(symbolId);

    return {
      title: node.name,
      type: node.type,
      description: await this.generateDescription(node),
      codeSnippet: node.source,
      references: references.map(r => r.id),
      dependencies: dependencies.map(d => d.id),
      diagram: this.generateDiagram(node, references, dependencies),
      lastUpdated: new Date().toISOString(),
    };
  }

  private extractSymbols(ast: any): Symbol[] {
    // Walk AST and extract functions, classes, interfaces, etc.
    return ast.body
      .filter(node => ['FunctionDeclaration', 'ClassDeclaration',
                        'InterfaceDeclaration', 'TypeAlias'].includes(node.type))
      .map(node => ({
        id: \`\${node.name}-\${node.loc.start.line}\`,
        name: node.name,
        type: node.type,
        source: node.source,
        loc: node.loc,
      }));
  }
}`;

export const wikiPages = [
  {
    id: 'overview',
    title: 'Project Overview',
    icon: 'BookOpen',
    content: `# CodeBook Core\n\nCodeBook Core is the foundational engine that powers the CodeBook platform. It provides AI-driven code analysis, documentation generation, and interactive knowledge graph construction.\n\n## Architecture\n\nThe system is built on three main pillars:\n\n1. **AST Parser** - Parses source code into Abstract Syntax Trees\n2. **Knowledge Graph** - Builds interconnected relationships between code symbols\n3. **Wiki Generator** - Produces human-readable documentation from the graph\n\n## Getting Started\n\n\`\`\`bash\nnpm install @codebook/core\n\`\`\`\n\n\`\`\`typescript\nimport { WikiEngine } from '@codebook/core';\n\nconst engine = new WikiEngine({ repo: 'my-project' });\nawait engine.initialize();\nconst page = await engine.generatePage('MyComponent');\n\`\`\``,
    lastUpdated: '2026-02-16',
  },
  {
    id: 'wiki-engine',
    title: 'WikiEngine',
    icon: 'Cpu',
    content: `# WikiEngine Class\n\nThe core class responsible for orchestrating the documentation generation pipeline.\n\n## Constructor\n\n\`\`\`typescript\nnew WikiEngine(config: RepoConfig)\n\`\`\`\n\n| Parameter | Type | Description |\n|-----------|------|-------------|\n| config | RepoConfig | Repository configuration |\n\n## Methods\n\n### initialize()\n\nParses all source files and builds the knowledge graph.\n\n\`\`\`typescript\nawait engine.initialize(): Promise<void>\n\`\`\`\n\n### generatePage(symbolId)\n\nGenerates a wiki page for the specified symbol.\n\n\`\`\`typescript\nconst page = await engine.generatePage('WikiEngine'): Promise<WikiPage>\n\`\`\`\n\n## Dependencies\n\n- \`KnowledgeGraph\` - Graph data structure\n- \`parseAST\` - AST parsing utility\n- \`buildGraph\` - Graph construction utility`,
    lastUpdated: '2026-02-16',
  },
  {
    id: 'knowledge-graph',
    title: 'KnowledgeGraph',
    icon: 'Share2',
    content: `# KnowledgeGraph\n\nA directed graph that models relationships between code symbols.\n\n## Overview\n\nThe KnowledgeGraph stores nodes (symbols) and edges (relationships) discovered during AST parsing. It supports:\n\n- **Imports/Exports** - Module dependency tracking\n- **Inheritance** - Class hierarchy relationships\n- **Type References** - Type usage and parameter types\n- **Function Calls** - Call graph construction\n\n## API\n\n\`\`\`typescript\nclass KnowledgeGraph {\n  addNode(symbol: Symbol): void\n  addEdge(from: string, to: string, type: EdgeType): void\n  getNode(id: string): Symbol | null\n  getReferences(id: string): Symbol[]\n  getDependencies(id: string): Symbol[]\n  buildEdges(): void\n  get nodeCount(): number\n}\n\`\`\`\n\n## Edge Types\n\n| Type | Description |\n|------|-------------|\n| IMPORTS | Module import relationship |\n| EXTENDS | Class inheritance |\n| IMPLEMENTS | Interface implementation |\n| CALLS | Function call reference |\n| REFERENCES | Type reference |`,
    lastUpdated: '2026-02-15',
  },
  {
    id: 'ast-parser',
    title: 'AST Parser',
    icon: 'FileCode',
    content: `# AST Parser\n\nUtilities for parsing source code into Abstract Syntax Trees.\n\n## Functions\n\n### parseAST()\n\n\`\`\`typescript\nasync function parseAST(\n  filePath: string,\n  content: string\n): Promise<ASTNode>\n\`\`\`\n\nParses source code and returns a structured AST. Supports:\n- TypeScript / JavaScript\n- Python\n- Go\n- Rust\n- Java\n\n### buildGraph()\n\n\`\`\`typescript\nfunction buildGraph(asts: ASTNode[]): KnowledgeGraph\n\`\`\`\n\nTakes multiple ASTs and constructs a unified knowledge graph.\n\n## Language Support\n\nThe parser uses Tree-sitter under the hood for language-agnostic parsing:\n\n\`\`\`typescript\nimport { parseAST } from '@codebook/core';\n\nconst ast = await parseAST('src/main.rs', rustCode);\n// Works with any supported language\n\`\`\``,
    lastUpdated: '2026-02-14',
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: 'Settings',
    content: `# Configuration\n\n## RepoConfig\n\n\`\`\`typescript\ninterface RepoConfig {\n  repo: string;          // Repository URL or path\n  branch?: string;       // Branch to analyze (default: main)\n  include?: string[];    // Glob patterns to include\n  exclude?: string[];    // Glob patterns to exclude\n  languages?: string[];  // Languages to parse\n  depth?: number;        // Maximum analysis depth\n}\n\`\`\`\n\n## Example\n\n\`\`\`typescript\nconst config: RepoConfig = {\n  repo: 'https://github.com/user/project',\n  branch: 'main',\n  include: ['src/**/*.ts', 'lib/**/*.ts'],\n  exclude: ['**/*.test.ts', '**/node_modules/**'],\n  languages: ['typescript'],\n  depth: 5,\n};\n\`\`\`\n\n## Environment Variables\n\n| Variable | Description | Default |\n|----------|-------------|---------|\n| CODEBOOK_API_KEY | API key for AI features | - |\n| CODEBOOK_CACHE_DIR | Cache directory | .codebook |\n| CODEBOOK_MAX_FILES | Max files to parse | 10000 |\n| CODEBOOK_TIMEOUT | Parse timeout (ms) | 30000 |`,
    lastUpdated: '2026-02-13',
  },
];

export const issues = [
  {
    id: 1, title: 'Parser fails on decorators with complex expressions', state: 'open',
    labels: [{ name: 'bug', color: '#d73a4a' }, { name: 'parser', color: '#0075ca' }],
    author: 'sarah-dev', createdAt: '2026-02-15', comments: 5, assignees: ['alex-dev'],
    body: 'When parsing TypeScript files with decorators that contain complex expressions like template literals, the parser throws an unexpected token error.\n\n```typescript\n@Component({\n  template: `<div>${expr}</div>`\n})\nexport class MyComponent {}\n```\n\nExpected: Parser handles decorator expressions correctly\nActual: Throws `UnexpectedToken` error at line 2',
  },
  {
    id: 2, title: 'Add support for Python type hints in knowledge graph', state: 'open',
    labels: [{ name: 'enhancement', color: '#a2eeef' }, { name: 'python', color: '#3572A5' }],
    author: 'pydev42', createdAt: '2026-02-14', comments: 12, assignees: [],
    body: 'Python type hints (PEP 484) should be parsed and included in the knowledge graph as type references. This would improve documentation accuracy for Python projects.',
  },
  {
    id: 3, title: 'Wiki generation extremely slow for large monorepos', state: 'open',
    labels: [{ name: 'performance', color: '#f9d0c4' }, { name: 'help wanted', color: '#008672' }],
    author: 'mono-mike', createdAt: '2026-02-12', comments: 8, assignees: ['alex-dev', 'perf-pat'],
    body: 'When running on a monorepo with 50k+ files, the wiki generation takes over 30 minutes. We need to implement incremental parsing and caching.',
  },
  {
    id: 4, title: 'Support for Rust lifetime annotations', state: 'open',
    labels: [{ name: 'enhancement', color: '#a2eeef' }, { name: 'rust', color: '#dea584' }],
    author: 'rustacean', createdAt: '2026-02-10', comments: 3, assignees: [],
    body: 'Rust lifetime annotations should be parsed and displayed in the wiki documentation.',
  },
  {
    id: 5, title: 'Diagram generation crashes with circular dependencies', state: 'closed',
    labels: [{ name: 'bug', color: '#d73a4a' }, { name: 'diagrams', color: '#5319e7' }],
    author: 'debug-diana', createdAt: '2026-02-08', comments: 15, assignees: ['alex-dev'],
    closedAt: '2026-02-12',
    body: 'When the knowledge graph contains circular dependencies, the diagram generator enters an infinite loop.',
  },
  {
    id: 6, title: 'Incorrect symbol resolution for re-exported types', state: 'closed',
    labels: [{ name: 'bug', color: '#d73a4a' }],
    author: 'types-tony', createdAt: '2026-02-05', comments: 7, assignees: ['sarah-dev'],
    closedAt: '2026-02-09',
    body: 'Re-exported types are not correctly resolved in the knowledge graph, leading to broken links in wiki pages.',
  },
];

export const pullRequests = [
  {
    id: 1, title: 'feat: implement incremental parsing for large repos', state: 'open',
    author: 'perf-pat', createdAt: '2026-02-15', comments: 8,
    labels: [{ name: 'performance', color: '#f9d0c4' }, { name: 'feature', color: '#0e8a16' }],
    reviewers: ['alex-dev', 'sarah-dev'], branch: 'feat/incremental-parsing',
    additions: 847, deletions: 123, files: 12, status: 'review',
    body: 'Implements incremental parsing that only re-parses changed files. Uses file hashing to detect changes and a persistent cache for AST results.\n\n## Changes\n- Add file hash tracking\n- Implement AST cache with LRU eviction\n- Add incremental graph update logic\n- Update wiki generator to use cached results\n\n## Performance\n- First run: ~same as before\n- Subsequent runs: 5-10x faster',
    diff: [
      { file: 'src/utils/parser.ts', additions: 234, deletions: 45 },
      { file: 'src/utils/cache.ts', additions: 312, deletions: 0 },
      { file: 'src/utils/graph.ts', additions: 156, deletions: 67 },
      { file: 'tests/cache.test.ts', additions: 145, deletions: 11 },
    ],
  },
  {
    id: 2, title: 'fix: resolve circular dependency in diagram generation', state: 'merged',
    author: 'alex-dev', createdAt: '2026-02-10', comments: 4,
    labels: [{ name: 'bug', color: '#d73a4a' }],
    reviewers: ['sarah-dev'], branch: 'fix/circular-deps',
    additions: 67, deletions: 12, files: 3, status: 'merged',
    mergedAt: '2026-02-12',
    body: 'Fixes #5. Adds cycle detection during diagram generation using DFS traversal.',
    diff: [
      { file: 'src/utils/graph.ts', additions: 34, deletions: 5 },
      { file: 'src/utils/diagram.ts', additions: 22, deletions: 7 },
      { file: 'tests/graph.test.ts', additions: 11, deletions: 0 },
    ],
  },
  {
    id: 3, title: 'feat: add Go language support', state: 'open',
    author: 'go-guru', createdAt: '2026-02-13', comments: 6,
    labels: [{ name: 'feature', color: '#0e8a16' }, { name: 'languages', color: '#c5def5' }],
    reviewers: ['alex-dev'], branch: 'feat/go-support',
    additions: 1234, deletions: 45, files: 18, status: 'changes_requested',
    body: 'Adds full Go language support including:\n- Struct parsing\n- Interface parsing\n- Function/method parsing\n- Package-level documentation\n- Go module dependency tracking',
    diff: [
      { file: 'src/parsers/go.ts', additions: 567, deletions: 0 },
      { file: 'src/parsers/index.ts', additions: 12, deletions: 3 },
      { file: 'tests/go.test.ts', additions: 445, deletions: 0 },
    ],
  },
];

export const activityFeed = [
  { id: 1, type: 'push', user: 'alex-dev', repo: 'codebook-core', branch: 'main', commits: 3, time: '2 hours ago', message: 'Improve error handling in AST parser' },
  { id: 2, type: 'star', user: 'new-fan', repo: 'codebook-core', time: '3 hours ago' },
  { id: 3, type: 'pr', user: 'perf-pat', repo: 'codebook-core', prTitle: 'Implement incremental parsing', action: 'opened', time: '5 hours ago' },
  { id: 4, type: 'issue', user: 'sarah-dev', repo: 'codebook-core', issueTitle: 'Parser fails on decorators', action: 'opened', time: '8 hours ago' },
  { id: 5, type: 'fork', user: 'fork-fred', repo: 'codebook-core', time: '12 hours ago' },
  { id: 6, type: 'release', user: 'alex-dev', repo: 'codebook-core', tag: 'v2.1.0', time: '1 day ago' },
  { id: 7, type: 'push', user: 'sarah-dev', repo: 'api-gateway', branch: 'feat/rate-limit', commits: 1, time: '1 day ago', message: 'Add sliding window rate limiter' },
  { id: 8, type: 'comment', user: 'debug-diana', repo: 'codebook-core', issueTitle: 'Diagram generation crashes', time: '2 days ago' },
  { id: 9, type: 'star', user: 'ml-maria', repo: 'awesome-codebook', time: '2 days ago' },
  { id: 10, type: 'pr', user: 'alex-dev', repo: 'codebook-core', prTitle: 'Fix circular dependency', action: 'merged', time: '4 days ago' },
];

export const snippets = [
  {
    id: 's1', title: 'React useDebounce Hook', description: 'Custom debounce hook for React',
    language: 'TypeScript', isPublic: true, stars: 42, forks: 8,
    createdAt: '2026-02-10', updatedAt: '2026-02-14', author: 'codebook-user',
    files: [{
      name: 'useDebounce.ts',
      content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    }],
  },
  {
    id: 's2', title: 'Go Error Handling Pattern', description: 'Clean error handling with wrapping',
    language: 'Go', isPublic: true, stars: 28, forks: 3,
    createdAt: '2026-02-08', updatedAt: '2026-02-08', author: 'codebook-user',
    files: [{
      name: 'errors.go',
      content: `package errors

import (
\t"fmt"
)

type AppError struct {
\tCode    int
\tMessage string
\tErr     error
}

func (e *AppError) Error() string {
\treturn fmt.Sprintf("[%d] %s: %v", e.Code, e.Message, e.Err)
}

func Wrap(err error, code int, msg string) *AppError {
\treturn &AppError{Code: code, Message: msg, Err: err}
}`,
    }],
  },
  {
    id: 's3', title: 'Python FastAPI CRUD Template', description: 'Quick CRUD endpoint setup',
    language: 'Python', isPublic: true, stars: 67, forks: 15,
    createdAt: '2026-01-20', updatedAt: '2026-02-01', author: 'codebook-user',
    files: [{
      name: 'crud.py',
      content: `from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
items_db: dict[int, dict] = {}

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

@router.post("/items/")
async def create_item(item: Item):
    item_id = len(items_db) + 1
    items_db[item_id] = item.model_dump()
    return {"id": item_id, **items_db[item_id]}

@router.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404)
    return items_db[item_id]`,
    }],
  },
];

export const storageFiles = [
  { id: 'f1', name: 'project-assets', type: 'folder', size: null, items: 24, updatedAt: '2026-02-16', shared: true },
  { id: 'f2', name: 'documentation', type: 'folder', size: null, items: 12, updatedAt: '2026-02-15', shared: false },
  { id: 'f3', name: 'architecture-diagram.svg', type: 'file', size: '245 KB', mime: 'image/svg+xml', updatedAt: '2026-02-16', shared: true },
  { id: 'f4', name: 'api-spec-v2.yaml', type: 'file', size: '18.3 KB', mime: 'text/yaml', updatedAt: '2026-02-15', shared: true },
  { id: 'f5', name: 'meeting-notes-feb.md', type: 'file', size: '4.2 KB', mime: 'text/markdown', updatedAt: '2026-02-14', shared: false },
  { id: 'f6', name: 'benchmark-results.json', type: 'file', size: '1.8 MB', mime: 'application/json', updatedAt: '2026-02-13', shared: false },
  { id: 'f7', name: 'demo-video.mp4', type: 'file', size: '48.2 MB', mime: 'video/mp4', updatedAt: '2026-02-12', shared: true },
  { id: 'f8', name: 'backups', type: 'folder', size: null, items: 6, updatedAt: '2026-02-10', shared: false },
  { id: 'f9', name: 'team-photos', type: 'folder', size: null, items: 34, updatedAt: '2026-02-08', shared: true },
  { id: 'f10', name: 'dataset-training-v3.csv', type: 'file', size: '234 MB', mime: 'text/csv', updatedAt: '2026-02-06', shared: false },
];

export const notifications = [
  { id: 1, type: 'pr_review', title: 'Review requested on #1', repo: 'codebook-core', time: '1h ago', read: false },
  { id: 2, type: 'issue_mention', title: 'Mentioned in #3', repo: 'codebook-core', time: '3h ago', read: false },
  { id: 3, type: 'ci', title: 'Build passed on main', repo: 'codebook-core', time: '5h ago', read: true },
  { id: 4, type: 'star', title: 'New star on codebook-core', repo: 'codebook-core', time: '8h ago', read: true },
  { id: 5, type: 'release', title: 'New release v2.1.0', repo: 'codebook-core', time: '1d ago', read: true },
];

export const contributionData = (() => {
  const data = [];
  const today = new Date(2026, 1, 16);
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const weekday = dayOfWeek > 0 && dayOfWeek < 6;
    const rand = Math.random();
    let level = 0;
    if (weekday) {
      if (rand > 0.3) level = 1;
      if (rand > 0.5) level = 2;
      if (rand > 0.75) level = 3;
      if (rand > 0.9) level = 4;
    } else {
      if (rand > 0.6) level = 1;
      if (rand > 0.8) level = 2;
      if (rand > 0.95) level = 3;
    }
    data.push({
      date: date.toISOString().split('T')[0],
      count: level === 0 ? 0 : level * 2 + Math.floor(Math.random() * 3),
      level,
    });
  }
  return data;
})();

export const trendingRepos = [
  { name: 'denoland/deno', description: 'A modern runtime for JavaScript and TypeScript', language: 'Rust', languageColor: '#dea584', stars: 98700, todayStars: 234 },
  { name: 'openai/whisper', description: 'Robust Speech Recognition via Large-Scale Weak Supervision', language: 'Python', languageColor: '#3572A5', stars: 72300, todayStars: 189 },
  { name: 'tailwindlabs/tailwindcss', description: 'A utility-first CSS framework', language: 'TypeScript', languageColor: '#3178c6', stars: 84600, todayStars: 156 },
  { name: 'astral-sh/ruff', description: 'An extremely fast Python linter and code formatter', language: 'Rust', languageColor: '#dea584', stars: 35800, todayStars: 145 },
  { name: 'anthropics/claude-code', description: 'CLI tool for AI-powered coding assistance', language: 'TypeScript', languageColor: '#3178c6', stars: 28400, todayStars: 312 },
];

export const chatMessages = [
  { id: 1, role: 'user', content: 'How does the WikiEngine class work?' },
  { id: 2, role: 'assistant', content: 'The **WikiEngine** class is the core orchestrator for documentation generation. Here\'s how it works:\n\n1. **Initialization** (`initialize()`): Scans all repository files, parses each into an AST, extracts symbols (functions, classes, interfaces), and builds a knowledge graph connecting them.\n\n2. **Page Generation** (`generatePage(symbolId)`): Takes a symbol ID, looks it up in the knowledge graph, finds all references and dependencies, then generates a structured WikiPage with description, code snippets, and diagrams.\n\n3. **Caching**: Uses an internal `Map<string, ParseResult>` cache to avoid re-parsing files.\n\nThe class depends on `KnowledgeGraph` for relationship tracking and `parseAST` for code parsing.\n\n📄 See: `src/components/App.tsx:15-78`' },
  { id: 3, role: 'user', content: 'What design patterns are used in this project?' },
  { id: 4, role: 'assistant', content: 'The project uses several design patterns:\n\n**1. Builder Pattern** - `KnowledgeGraph.buildEdges()` constructs the graph incrementally\n\n**2. Cache-Aside Pattern** - `WikiEngine.cache` stores parsed results for reuse\n\n**3. Strategy Pattern** - Different language parsers implement a common interface\n\n**4. Observer Pattern** - File watchers notify the engine of changes for incremental updates\n\n**5. Facade Pattern** - `WikiEngine` provides a simplified interface over the complex subsystems (parser, graph, generator)\n\nThe architecture follows clean separation of concerns with the parser, graph, and generator as distinct modules.\n\n📄 See: `src/utils/parser.ts`, `src/utils/graph.ts`' },
];

export const diagramCode = `graph TD
    A[WikiEngine] --> B[AST Parser]
    A --> C[KnowledgeGraph]
    A --> D[Wiki Generator]
    B --> E[Tree-sitter]
    B --> F[Language Plugins]
    C --> G[Node Store]
    C --> H[Edge Store]
    D --> I[Markdown Renderer]
    D --> J[Diagram Generator]

    style A fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style B fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style C fill:#06b6d4,stroke:#0891b2,color:#fff
    style D fill:#10b981,stroke:#059669,color:#fff`;

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export function timeAgo(dateStr) {
  const now = new Date(2026, 1, 16);
  const date = new Date(dateStr);
  const diff = now - date;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
