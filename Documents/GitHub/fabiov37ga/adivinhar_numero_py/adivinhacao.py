import random
print("*********************************")
print("Bem vindo ao jogo de adivinhaçao!")
print("*********************************")

numero_secreto = int(random.random() * 100)

tentativas = 5

for rodada in range(1, tentativas + 1):

    print("tentativa {} de {}".format(rodada, tentativas))

    chute = int(input("Digite um número entre 1-100: "))

    acertou = chute == numero_secreto
    maior = chute > numero_secreto
    menor = chute < numero_secreto


    if chute < 1 or chute > 100:
        print("Insira um numero de 1 a 100!!")
        continue

    if (acertou):
        print("Você acertou!")
        break
    elif (rodada <= tentativas - 1):
        if (maior):
            print("Você errou! chute mais baixo.")
        elif (menor):
            print("Você errou! chute mais alto.")

print(f"Fim de jogo. \nO número era {numero_secreto}")

