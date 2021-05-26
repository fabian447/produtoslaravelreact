@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
					<form action="{{ route('projects.update', $project->id) }}" method="POST">
						@csrf
						<input name="_method" type="hidden" value="PUT">
							<div class="form-group">
							<label for="email">Nombre</label>
							<input type="text" class="form-control" value="{{ $project->name }}" placeholder="Nombre del proyecto" name="name" required>
							</div>
							<div class="form-group">
								<label for="email">Etiquetas <small class="text-danger">(Ingrese los elementos separados por comas)</small></label>
								<input type="text" class="form-control"  value="{{ $project->tags }}"  placeholder="Etiquetas" name="tags" required>
							</div>
							{{-- <div class="form-group">
								<label for="email">Logo</label>
								<input type="file" class="form-control" placeholder="Logo del proyecto" name="logo" required>
							</div>
							<div class="form-group">
								<label for="email">Imagen</label>
								<input type="file" class="form-control" placeholder="Imagen del proyecto" name="image" required>
							</div> --}}
							<div class="form-group">
								<label for="email">URL</label>
								<input type="text" class="form-control"  value="{{ $project->url }}"  placeholder="URL del proyecto" name="url" required>
							</div>
							<div class="form-group">
								<label for="email">Color de fondo</label>
								<input type="color" class="form-control" value="{{ $project->background_color }}"  placeholder="Color de fondo" name="background_color" required>
							</div>
							<div class="form-group">
								<label for="email">Color de texto</label>
								<input type="color" class="form-control" value="{{ $project->font_color }}"  placeholder="Color de fondo" name="font_color" required>
							</div>
							<div class="form-group">
								<label for="email">Descripcion</label>
								<textarea class="form-control" name="description" rows="3" required>{{ $project->description }}</textarea>
							</div>
							
					  <button type="submit" class="btn btn-primary float-rigth">Guardar</button>
					</form> 
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
