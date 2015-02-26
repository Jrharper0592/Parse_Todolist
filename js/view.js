;(function() {
    Parse.todoView = Parse.TemplateView.extend({
        el: ".app-container",
        view: "todoTemplate",
        events: {
            'click .add': 'todoAdd',
            'click .cancel': 'todoCancel',
            'click .submit': 'todoSubmit',
            'click .todo-container': 'todoEditMode',
            'click .delete-button': 'todoDelete'
        },
        Submit: function(e) {
          e.preventDefault();
        },
        todoAdd: function(e) {
            console.log('add event')
            $('.editor').removeClass('hidden')
            e.preventDefault();
            var td = {
                name: ''
            };
        },
        todoCancel: function(e) {

            console.log('cancel event')

            e.preventDefault();

            $('.editor').addClass('hidden')
        },
        todoSubmit: function(e) {

            console.log('submit event');
            e.preventDefault();

            var fromForm = {
                name: $('input[name="name"]').val(),
                dueBy: $('input[name="dueBy"]').val(),
                description: $('input[name="description"]').val(),
                date: new Date()
            }
            console.log(fromForm)
            this.collection.create(fromForm)
        },
        todoEditMode: function(e) {
            console.log('editmode engaged')
            e.preventDefault()
            var index = e.currentTarget.id.replace(/[^0-9]/g, '')
            $('.delete-button').addClass('hidden')
            $('#delete-' + index).removeClass('hidden')

        },

        todoDelete: function(e) {
            e.preventDefault()
            var index = e.currentTarget.id.replace(/[^0-9]/g, '')
            console.log(index)

            this.collection.remove(this.collection.at(index))

        }
    });

}());