import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"


export function ToyList({ toys, onRemoveToy, onEditToy, onReorderToys }) {
    // console.log(toys)

    const onDragEnd = (result) => {
        const { destination, source } = result
        if (!destination) return

        if (destination.index !== source.index) {
            onReorderToys(source.index, destination.index)
        }
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-toys">
                {(provided) => (
                    <section className="toy-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {toys.map((toy, index) => (
                            <Draggable key={toy._id} draggableId={toy._id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${snapshot.isDragging} toy-preview clean-list`}
                                    >
                                        <ToyPreview toy={toy} />
                                        <div className="actions-btns">
                                            <button className="btn" onClick={() => onRemoveToy(toy._id)}>x</button>
                                            <Link to={`/toy/${toy._id}`}><button className="btn ">Details</button></Link>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        </DragDropContext>
    )
}