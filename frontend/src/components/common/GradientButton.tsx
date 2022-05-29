type GradientButtonProps = {
  bg: string
  text: string
}

export default function GradientButton({ text, bg }: GradientButtonProps) {
  return (
    <button className={"flex items-center justify-center rounded-full bg-gradient-to-r from-primary-button-start to-primary-button-stop p-0.5"}>
      <span className={`text-sm font-medium px-9 py-1 rounded-full ${bg} transition-all duration-75 ease-in hover:bg-opacity-0`}>
        {text}
      </span>
    </button>
  )
}
