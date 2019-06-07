export class MainController {
  constructor ($http) {
    'ngInject';
    // refering to the object we are currently creating, not the http as a parameter
    this.$http = $http;
    this.getMessages();
  }

  postMessage() {
    this.$http.post('http://localhost:8080/api/message', {
    	msg: this.message
    });
    this.messages.push(this.message);
    console.log(this.message)
  }
  getMessages() {
  	var vm =  this;
  	this.$http.get('http://localhost:8080/api/message')
  	.then((result) => {
  		vm.messages = result.data;
  	});
    console.log(this)
  }
}
