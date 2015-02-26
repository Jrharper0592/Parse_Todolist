;(function() {

    Parse.todoModel = Parse.Object.extend({
        className: "Task",
        defaults: {
            isDone: false,
            urgent: false,
            dueDate: null,
            tags: [],
            description: "no description given"
        },
        initialize: function() {
            this.on("change", function() {
                this.save();
            })
        }

    });

    Parse.todoCollection = Parse.Collection.extend({
        model: Parse.todoModel,
        comparator: function(a, b){
            // if a is 'urgent', -1 (a comes before b)
            if(a.get('urgent') && !b.get('urgent') || !a.get('isDone') && b.get('isDone')) return -1;
            // if a 'isDone', 1 (a comes after b)
            if(a.get('isDone') && !b.get('isDone') || !a.get('urgent') && b.get('urgent')) return 1;

            return a.get('description') > b.get('description') ? 1 : -1;
        }
    });

}());