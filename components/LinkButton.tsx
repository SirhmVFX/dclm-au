function LinkButton({ title }: { title: string }) {
  return (
    <>
      <button className="px-4 py-3 bg-primary text-white">{title}</button>
    </>
  );
}

export default LinkButton;
