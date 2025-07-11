const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "travel.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS destinos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                image TEXT,
                description TEXT,
                rating REAL,
                location TEXT,
                tags TEXT
            )`, (err) => {
                if (err) {
                    // Tabela já criada
                } else {
                    // Inserir dados realistas de destinos brasileiros
                    const destinations = [
                        { 
                            id: 1, 
                            name: "Fernando de Noronha", 
                            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop", 
                            description: "Arquipélago vulcânico com 21 ilhas, conhecido por suas praias paradisíacas, vida marinha exuberante e ecoturismo sustentável.", 
                            rating: 4.9, 
                            location: "Pernambuco, Brasil", 
                            tags: ["Praias", "Mergulho", "Ecoturismo", "Natureza", "Snorkel"] 
                        },
                        { 
                            id: 2, 
                            name: "Gramado", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            description: "Cidade serrana com arquitetura europeia, gastronomia refinada, clima frio e famosos festivais de cinema e natal.", 
                            rating: 4.8, 
                            location: "Rio Grande do Sul, Brasil", 
                            tags: ["Montanha", "Gastronomia", "Cultura", "Romance", "Inverno"] 
                        },
                        { 
                            id: 3, 
                            name: "Bonito", 
                            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop", 
                            description: "Capital do ecoturismo brasileiro, famosa por águas cristalinas, cavernas, cachoeiras e turismo sustentável.", 
                            rating: 4.7, 
                            location: "Mato Grosso do Sul, Brasil", 
                            tags: ["Ecoturismo", "Aventura", "Natureza", "Cachoeiras", "Cavernas"] 
                        },
                        { 
                            id: 4, 
                            name: "Jericoacoara", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            description: "Vila de pescadores transformada em destino turístico mundial, famosa pelas dunas, lagoas e esportes náuticos.", 
                            rating: 4.6, 
                            location: "Ceará, Brasil", 
                            tags: ["Praias", "Kitesurf", "Dunas", "Lagoas", "Aventura"] 
                        },
                        { 
                            id: 5, 
                            name: "Chapada Diamantina", 
                            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop", 
                            description: "Parque nacional com formações rochosas impressionantes, cachoeiras cristalinas e trilhas de tirar o fôlego.", 
                            rating: 4.8, 
                            location: "Bahia, Brasil", 
                            tags: ["Trekking", "Cachoeiras", "Natureza", "Aventura", "Grutas"] 
                        },
                        { 
                            id: 6, 
                            name: "Búzios", 
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop", 
                            description: "Península com mais de 20 praias, vida noturna agitada e charme internacional que encanta visitantes do mundo todo.", 
                            rating: 4.5, 
                            location: "Rio de Janeiro, Brasil", 
                            tags: ["Praias", "Vida Noturna", "Romance", "Gastronomia", "Internacional"] 
                        },
                        { 
                            id: 7, 
                            name: "Pantanal", 
                            image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop", 
                            description: "Maior planície alagável do mundo, paraíso da observação de fauna com onças, jacarés, aves exóticas e paisagens únicas.", 
                            rating: 4.7, 
                            location: "Mato Grosso, Brasil", 
                            tags: ["Safari", "Fauna", "Ecoturismo", "Fotografia", "Natureza"] 
                        },
                        { 
                            id: 8, 
                            name: "Campos do Jordão", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            description: "Suíça brasileira com clima europeu, arquitetura alpina, cervejarias artesanais e o famoso Festival de Inverno.", 
                            rating: 4.4, 
                            location: "São Paulo, Brasil", 
                            tags: ["Montanha", "Inverno", "Cervejarias", "Cultura", "Romance"] 
                        }
                    ];
                    const insertDestinos = "INSERT INTO destinos (name, image, description, rating, location, tags) VALUES (?,?,?,?,?,?)";
                    destinations.forEach(dest => {
                        db.run(insertDestinos, [dest.name, dest.image, dest.description, dest.rating, dest.location, JSON.stringify(dest.tags)]);
                    });
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS pacotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                image TEXT,
                duration TEXT,
                people TEXT,
                date TEXT,
                price REAL,
                includes TEXT,
                highlight BOOLEAN
            )`, (err) => {
                if (err) {
                    // Tabela já criada
                } else {
                    // Inserir pacotes mais realistas com preços e detalhes variados
                    const packages = [
                        { 
                            id: 1, 
                            title: "Fernando de Noronha Completo", 
                            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop", 
                            duration: "7 dias / 6 noites", 
                            people: "2 pessoas", 
                            date: "Disponível o ano todo", 
                            price: 12990, 
                            includes: ["Passagens aéreas", "Hotel 4★ com café", "Transfers", "Taxa de preservação", "Passeio de barco", "Mergulho livre"], 
                            highlight: true 
                        },
                        { 
                            id: 2, 
                            title: "Gramado Romântico de Inverno", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            duration: "4 dias / 3 noites", 
                            people: "2 pessoas", 
                            date: "Junho a Setembro", 
                            price: 2890, 
                            includes: ["Hotel boutique", "Café da manhã", "Jantar no Colosseo", "City tour", "Seguro viagem"], 
                            highlight: false 
                        },
                        { 
                            id: 3, 
                            title: "Bonito Ecoaventura", 
                            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop", 
                            duration: "5 dias / 4 noites", 
                            people: "2 pessoas", 
                            date: "Março a Novembro", 
                            price: 4790, 
                            includes: ["Pousada ecológica", "Café da manhã", "Flutuação no Rio da Prata", "Gruta do Lago Azul", "Aquário Natural"], 
                            highlight: false 
                        },
                        { 
                            id: 4, 
                            title: "Jericoacoara Kite & Relax", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            duration: "6 dias / 5 noites", 
                            people: "2 pessoas", 
                            date: "Julho a Janeiro", 
                            price: 3990, 
                            includes: ["Pousada pé na areia", "Café da manhã", "Transfer Fortaleza", "Aula de kitesurf", "Passeio Lagoa do Paraíso"], 
                            highlight: false 
                        },
                        { 
                            id: 5, 
                            title: "Chapada Diamantina Trekking", 
                            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop", 
                            duration: "7 dias / 6 noites", 
                            people: "4 pessoas", 
                            date: "Abril a Outubro", 
                            price: 2690, 
                            includes: ["Pousada regional", "Pensão completa", "Guia especializado", "Trilha Vale do Pati", "Poço Azul e Enchantado"], 
                            highlight: false 
                        },
                        { 
                            id: 6, 
                            title: "Búzios VIP Experience", 
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop", 
                            duration: "4 dias / 3 noites", 
                            people: "2 pessoas", 
                            date: "Ano todo (alta temporada +30%)", 
                            price: 4590, 
                            includes: ["Resort 5★ vista mar", "All inclusive", "Trolley tour", "Passeio de escuna", "Massagem relaxante"], 
                            highlight: false 
                        },
                        { 
                            id: 7, 
                            title: "Pantanal Safari Fotográfico", 
                            image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop", 
                            duration: "5 dias / 4 noites", 
                            people: "3 pessoas", 
                            date: "Maio a Setembro (seca)", 
                            price: 5890, 
                            includes: ["Fazenda lodge", "Pensão completa", "Safaris diários", "Focagem noturna", "Pesca de piranha", "Guia biólogo"], 
                            highlight: true 
                        },
                        { 
                            id: 8, 
                            title: "Campos do Jordão Festival", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            duration: "3 dias / 2 noites", 
                            people: "2 pessoas", 
                            date: "Julho (Festival de Inverno)", 
                            price: 1890, 
                            includes: ["Hotel centro", "Café da manhã", "Ingresso festival", "Tour cervejarias", "Teleférico"], 
                            highlight: false 
                        },
                        { 
                            id: 9, 
                            title: "Ilha Grande Aventura", 
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop", 
                            duration: "4 dias / 3 noites", 
                            people: "2 pessoas", 
                            date: "Outubro a Abril", 
                            price: 3290, 
                            includes: ["Pousada Abraão", "Café da manhã", "Transfer Angra", "Trilha Lopes Mendes", "Mergulho Lagoa Azul"], 
                            highlight: false 
                        },
                        { 
                            id: 10, 
                            title: "Salvador + Morro de São Paulo", 
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop", 
                            duration: "8 dias / 7 noites", 
                            people: "2 pessoas", 
                            date: "Ano todo", 
                            price: 4990, 
                            includes: ["Hotéis 4★", "Café da manhã", "City tour Salvador", "Transfer Morro SP", "Show folclórico", "Passeio de catamarã"], 
                            highlight: false 
                        }
                    ];
                    const insertPacotes = "INSERT INTO pacotes (title, image, duration, people, date, price, includes, highlight) VALUES (?,?,?,?,?,?,?,?)";
                    packages.forEach(pkg => {
                        db.run(insertPacotes, [pkg.title, pkg.image, pkg.duration, pkg.people, pkg.date, pkg.price, JSON.stringify(pkg.includes), pkg.highlight]);
                    });
                }
            });
        });
    }
});

module.exports = db;