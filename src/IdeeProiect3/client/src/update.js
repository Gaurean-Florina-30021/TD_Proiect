function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        laptop: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/laptops/'+this.id).then(
            (response) => {
                this.laptop = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.laptop);

            return axios.post('http://localhost:3000/laptops', this.laptop).then(
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
  