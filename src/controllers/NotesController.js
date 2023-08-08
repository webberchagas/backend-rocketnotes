const knex = require('../database/knex');

class NotesController {
    async index(request, response){
        const { title, tags } = request.query;

        const user_id = request.user.id;

        let notes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim())
            
            notes = await knex('tags')
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike('notes.title', `%${title}%`)
            .whereIn('name', filterTags)
            .innerJoin('notes', 'notes.id', 'tags.note_id')
            .groupBy('notes.id')
            .orderBy('notes.title')
        }else {
            notes = await knex('notes').where({user_id}).whereLike('title', `%${title}%`).orderBy('created_at');
        }

        const userTags = await knex("tags").where({user_id})

        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags)
    }

    async create(request, response){
        const {title, description, tags, links} = request.body;
        const user_id = request.user.id;

        const [note_id] = await knex('notes').insert({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(tag => {
            return {
                name: tag,
                note_id,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.status(201).json();
    }

    async show(request, response){
        const {note_id} = request.params;

        const note = await knex('notes').where({id: note_id}).first();

        const tags = await knex('tags').where({note_id}).orderBy('name');

        const links = await knex('links').where({note_id}).orderBy('created_at');

        return response.json({
            ...note,
            tags,
            links
        });
    }

    async delete(request, response){
        const {note_id} = request.params;

        await knex('notes').where({id: note_id}).delete();

        return response.json();
    }
}

module.exports = NotesController;