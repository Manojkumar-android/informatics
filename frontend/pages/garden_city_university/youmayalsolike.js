// components/YouMayAlsoLike.js
const YouMayAlsoLike = ({ recommendedBooks }) => {
    return (
      <div className="mt-8 bg-yellow-50 w-full h-[400px] px-4"> {/* Added px-4 for padding on both sides */}
        <h2 className="text-2xl font-semibold">You might also like</h2>
        <div className="flex mt-4 justify-between space-x-4">
          {recommendedBooks.map((recBook) => (
            <div key={recBook.id} className="flex flex-col items-center flex-1">
              <img src={recBook.imageUrl} alt={recBook.title} className="w-[170.06px] h-[267px] object-cover" />
              <button className="bg-purple-800 w-[171px] h-[48px] text-white mt-4 px-4 py-2 rounded">
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default YouMayAlsoLike;
  