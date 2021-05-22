add.js
function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        laptop: {}
      },
      created: function () {
      },
      methods: {
       add: function(){
            console.dir(this.laptop);
            return axios.put('http://localhost:3000/laptops', this.laptop).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );

        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });

add.html