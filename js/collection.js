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
        model: Parse.todoModel
    });

}());