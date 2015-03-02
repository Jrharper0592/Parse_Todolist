;(function() {
    Parse.todoView = Parse.TemplateView.extend({
        el: ".app-container",
        view: "todoTemplate",
        events: {
            'click .add': 'todoAdd',
            'click .cancel': 'todoCancel',
            'click .submit': 'todoSubmit',
            "change input[name='urgent']": "toggleUrgent",
            "change input[name='isDone']": "toggleIsDone",
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
                date: new Date(),
                user: Parse.User.current()
            }
             var task = new Parse.todoModel(fromForm);
            var acl = new Parse.ACL(Parse.User.current());
            var self = this;
            task.setACL(acl);
            task.save().then(function(){
                self.collection.fetch()
            });
            console.log(fromForm)
            // this.collection.create(fromForm)
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

        },
        toggleUrgent: function(e){
            var m = this.getModelAssociatedWithEvent(e);
            if(m){
                m.set('urgent', !m.get('urgent'));
                this.collection.sort();
                this.render();
            }
        },
        toggleIsDone: function(e){
            var m = this.getModelAssociatedWithEvent(e);
            if(m){
                m.set('isDone', !m.get('isDone'));
                if(m.get('isDone')){ // if setting to 'done', set 'urgent' to false
                    m.set('urgent', false);
                }
                this.collection.sort();
                this.render();
            }
        },
        getModelAssociatedWithEvent: function(e){
            var el = e.target,
                li = $(el).closest('li')[0],
                id = li.getAttribute('id'),
                m = this.collection.get(id);

            return m;
        }
    });

}());