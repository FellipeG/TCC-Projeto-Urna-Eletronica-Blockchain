#!/bin/bash

echo "Opções:"
echo "1 - Iniciar Projeto"
echo "2 - Executar Testes Unitários"
echo "Selecione as opções (Separadas por vírgula):"
read OPTIONS 

IFS=',' read -a OPT <<< "$OPTIONS"

for i in "${OPT[@]}"; do
    
    if [ $i -eq "1" ]
    then
        cd backend
        echo "Executando o ganache..."
        ganache-cli -m "oppose hold method produce usual uncle flee subway climb pottery run voyage" -h 0.0.0.0 &
        echo "Executando as migrations..."
        truffle migrate 
        cd ../frontend
        echo "Iniciando o projeto em VueJS"
        npm run serve &
        cd ../
    elif [ $i -eq "2" ]
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