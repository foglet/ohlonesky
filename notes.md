Project Notes.

Challenge. Load mobile menu "with" partials. DOM needs to reload after loading partials.


/test/alpine.html

      This guarantees:
      	1.	Your HTML partial (menuAlpine.html) is in the DOM
      	2.	Then Alpine is loaded and initializes
      	3.	Alpine binds correctly to the freshly injected markup

      <!-- Your HTML partial (menuAlpine.html) is in the DOM -->
          <script src="/assets/js/partialLoader.js"></script>

          <!-- Instead of defer-loading Alpine, do this inline -->
          <script>
            // Wait until partials are injected, then load Alpine manually
            injectPartials().then(() => {
              const alpineScript = document.createElement('script');
              alpineScript.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';
              alpineScript.defer = true;
              document.body.appendChild(alpineScript);
            });
          </script>

        //* this too *//
          async function injectPartials(selector = '[include-html]') {
            const nodes = document.querySelectorAll(selector);

            await Promise.all([...nodes].map(async node => {
              const file = node.getAttribute('include-html');
              if (!file) return;

              try {
                const response = await fetch(file);
                const html = await response.text();
                const temp = document.createElement('div');
                temp.innerHTML = html;
                node.replaceWith(...temp.childNodes);
              } catch (err) {
                console.error(`❌ Failed to load partial: ${file}`, err);
              }
            }));

            console.log('✅ Partials injected');
            return Promise.resolve();
          }
