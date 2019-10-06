import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('O email não é valido')
        .required('O email é requerido'),
      password: Yup.string().required('A senha é requerida'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation', messages: err.inner });
  }
};
