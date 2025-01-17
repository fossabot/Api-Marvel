const axios = require('axios');
const env = require('dotenv');
const yup = require('yup');
const GenerateHash = require('../helpers/generate.hash');

exports.getCharacterEventsById = async (req, res) => {
    try {
        const id = req.params.id;
        const schema = yup.object().shape({
            id: yup.number().required()
        });

        if (!(await schema.isValid({ id }))) {
            return res.status(400).json({
                success: false,
                message: 'Id is required'
            });
        }

        const generateKeyEvents = new GenerateHash();

        let URI = `${process.env.BASE_URI}/${process.env.API_VERSION}/public/characters/${id}/events?ts=${generateKeyEvents.ts}&apikey=${process.env.PUBLIC_KEY}&hash=${generateKeyEvents.hashvalue}`;
        let GetaCharactersEventsById = await axios.get(URI);

        res.status(200).json(GetaCharactersEventsById.data.data.results);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        });
    }
};