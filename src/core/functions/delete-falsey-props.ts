/**
 * Esta función lo que hace es eliminar todas aquellas propiedades que posean
 * valores null o indefinidos
 *
 * Esta función se puede extender a valores no falsey
 * */
export function deleteFalseyProps<E>(entity: E){
    for(const key in entity){
        const value = entity[key];
        if(typeof value !== 'boolean' && !value) delete entity[key];
    }
    return entity as Partial<E>;
}
