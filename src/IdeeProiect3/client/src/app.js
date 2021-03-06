function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      laptops: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.laptops = response.data));
    },
    methods: {
      deleteLaptop: function(id) {
        console.log('HTTP DELETE spre backend, laptop: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.laptops = response.data));

        });
      },
    }
  });

  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
