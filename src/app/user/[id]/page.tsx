const Page = ({ params }: { params: { id: string } }) => {
	console.log(params);
	return <div>{params.id}</div>;
};

export default Page;
