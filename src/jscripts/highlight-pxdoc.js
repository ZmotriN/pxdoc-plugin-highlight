app.component('highlight', {
    props: ['lang', 'scroll'],
    created() {
        this.$nextTick(() => {
            hljs.highlightElement(this.$refs.code);
            // hljs.lineNumbersBlock(this.$refs.code);
        });
    },
    template: `<pre class="highlight"><code ref="code" :class="'language-' + this.lang + (this.scroll == 'true' ? ' scroll' : '')"><slot /></code></pre>`
});