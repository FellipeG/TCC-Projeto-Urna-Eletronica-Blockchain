#!/bin/sh
    
if [ $1 -eq "1" ]
then
    cd backend
    echo "Executando o ganache..."
    ganache-cli -m "oppose hold method produce usual uncle flee subway climb pottery run voyage" -e 90000 -h 0.0.0.0 &
    echo "Executando as migrations..."
    truffle migrate 
    cd ../frontend
    echo "Iniciando o projeto em VueJS"
    npm install
    npm run serve &
    cd ../
elif [ $1 -eq "2" ]
then
    cd backend
    echo "Executando testes unitários..."
    truffle test ./test/elections.js
    cd ../
else
    echo "Opção inválida!"
    exit 1
fi

done