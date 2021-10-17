import type { NextPage } from 'next'

type FooterProps = {
  setShowModal(b:boolean):void
}

const Footer: NextPage<FooterProps> = ({}) => {
  return (
    <div className="container-footer">
        <button><img src="/add.svg" alt="Adicionar tarefa"></img> Adicionar Tarefa</button>
        <span>© Copyright {new Date().getFullYear()} Fiap. Todos os direitos reservados.</span>
    </div>
  )
}

export { Footer }
