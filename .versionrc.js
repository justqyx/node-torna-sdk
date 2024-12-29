module.exports = {
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'docs', section: '📝 Documentation' },
    { type: 'style', section: '💄 Styles' },
    { type: 'refactor', section: '♻️ Code Refactoring' },
    { type: 'perf', section: '⚡️ Performance Improvements' },
    { type: 'test', section: '✅ Tests' },
    { type: 'build', section: '👷‍♂️ Build System' },
    { type: 'ci', section: '🔧 CI Configuration' },
    { type: 'chore', section: '🎫 Chores' },
    { type: 'revert', section: '⏪️ Reverts' }
  ],
  commitUrlFormat: 'https://github.com//node_torna_sdk/commit/{{hash}}',
  compareUrlFormat: 'https://github.com/justqyx/node_torna_sdk/compare/{{previousTag}}...{{currentTag}}',
  releaseCommitMessageFormat: 'chore(release): 🔖 {{currentTag}}',
  skip: {
    changelog: false,
    bump: false,
    commit: false,
    tag: false
  }
};
