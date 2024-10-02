const multer = require("multer");
const path = require("path");

// Configuração do armazenamento com multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define a pasta onde os arquivos serão armazenados
    cb(null, path.join(__dirname, "../uploads")); // Altere conforme necessário para a estrutura do seu projeto
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Nome do arquivo com um identificador único
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// Middleware de upload de arquivo usando multer
const upload = multer({ storage: storage });

module.exports = upload;
