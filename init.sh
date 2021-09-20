#!/bin/bash

echo "Opções:"
echo "1 - Iniciar Projeto"
echo "2 - Executar Testes Unitários"
echo "Selecione as opções (Separadas por vírgula):"
read OPTIONS 

cd backend

IFS=',' read -a OPT <<< "$OPTIONS"

for i in "${OPT[@]}"; do
    
    if [ $i -eq "1" ]
    then
        echo "Executando o ganache..."
        nohup ganache-cli &
        echo "Executando as migrations..."
        truffle migrate
    elif [ $i -eq "2" ]
    then
        echo "Executando testes unitários..."
        truffle test ./test/elections.js
    else
        echo "Opção inválida!"
        exit 1
    fi

done