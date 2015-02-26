;(function() {

    // var data = [{
    //         name: 'do homework',
    //         description: 'week 7 group todo list assignment',
    //         date: new Date()

    //     },

    //     {
    //         name: 'keep doing homework',
    //         description: 'week 8 group todo list assignment',
    //         date: new Date()

    //     }
    // ]

    Parse.todoRouter = Parse.Router.extend({

        initialize: function() {
            this.collection = new Parse.todoCollection()
            this.view = new Parse.todoView({
                collection: this.collection
            })
            this.collection.reset();
            
            this.userView = new Parse.UserView({});
            this.isLoggedIn();
            Parse.history.start();
        },
        routes: {
            "login": "login",
            '*default': 'home'
        },
          isLoggedIn: function(){
            this.user = Parse.User.current();
            if(!this.user){
                this.navigate("login", {trigger: true});
                return false;
            }
            return true;
        },

        login: function(){
            this.userView.render();
        },
        home: function() {
        if(!this.isLoggedIn()) return; // if user not logged in, exit this function
            var query = new Parse.Query(Parse.todoModel);
            query.equalTo("user", this.user);
            this.collection.query = query;
            this.collection.fetch();
            this.view.render();
        }

    });

}());